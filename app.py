"""
AgriScan - Offline AI-Powered Crop Disease & Pest Intelligence System
Flask REST API & Local SQLite Database Engine
College of Computer Science & Engineering Capstone Project
"""

import os
import json
import sqlite3
import hashlib
from datetime import datetime
from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, get_db_connection
from model_handler import analyze_leaf_image

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from localhost Vite/React frontend

# Ensure database tables exist
init_db()

def hash_password(password: str) -> str:
    """Hashes a password with SHA-256 for secure local storage."""
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

@app.route('/api/health', methods=['GET'])
def health_check():
    """Confirms local server status without internet connectivity."""
    return jsonify({
        "status": "online_local",
        "app": "AgriScan Python Flask Backend",
        "database": "SQLite (local file: agriscan.db)",
        "offline_ready": True,
        "timestamp": datetime.now().isoformat()
    }), 200

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json() or {}
    full_name = data.get('fullName', '').strip()
    email = data.get('email', '').strip().lower()
    phone = data.get('phone', '').strip()
    password = data.get('password', '')
    state = data.get('state', 'Karnataka')
    district = data.get('district', 'Dharwad')
    preferred_lang = data.get('preferredLanguage', 'en')
    main_crop = data.get('mainCrop', 'Tomato')

    if not full_name or not email or not password:
        return jsonify({"error": "Full name, email, and password are required."}), 400

    conn = get_db_connection()
    cursor = conn.cursor()

    # Check existing user
    cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
    if cursor.fetchone():
        conn.close()
        return jsonify({"error": "A farmer profile with this email already exists."}), 409

    pwd_hash = hash_password(password)
    user_id = f"user_{int(datetime.now().timestamp())}"
    now_str = datetime.now().isoformat()

    cursor.execute("""
        INSERT INTO users (id, full_name, email, phone, password_hash, state, district, preferred_language, main_crop, created_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (user_id, full_name, email, phone, pwd_hash, state, district, preferred_lang, main_crop, now_str))

    conn.commit()
    conn.close()

    return jsonify({
        "message": "Farmer registered successfully on local database.",
        "user": {
            "id": user_id,
            "fullName": full_name,
            "email": email,
            "phone": phone,
            "state": state,
            "district": district,
            "preferredLanguage": preferred_lang,
            "mainCrop": main_crop
        }
    }), 201

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json() or {}
    email_or_phone = data.get('emailOrUsername', '').strip().lower()
    password = data.get('password', '')

    if not email_or_phone or not password:
        return jsonify({"error": "Credentials missing."}), 400

    pwd_hash = hash_password(password)
    conn = get_db_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, full_name, email, phone, password_hash, state, district, preferred_language, main_crop
        FROM users WHERE email = ? OR phone = ?
    """, (email_or_phone, email_or_phone))
    row = cursor.fetchone()
    conn.close()

    if not row or row['password_hash'] != pwd_hash:
        return jsonify({"error": "Invalid email/phone or password."}), 401

    return jsonify({
        "message": "Local login authenticated.",
        "user": {
            "id": row['id'],
            "fullName": row['full_name'],
            "email": row['email'],
            "phone": row['phone'],
            "state": row['state'],
            "district": row['district'],
            "preferredLanguage": row['preferred_language'],
            "mainCrop": row['main_crop']
        }
    }), 200

@app.route('/api/scans/analyze', methods=['POST'])
def analyze_scan():
    """
    Receives an uploaded leaf image (base64 or multipart) and executes offline
    computer vision analysis + plant pathology diagnosis.
    """
    data = request.get_json() or {}
    image_b64 = data.get('imageB64', '')
    crop_name = data.get('cropName', 'Tomato')
    user_id = data.get('userId', 'demo_user')

    result = analyze_leaf_image(image_b64, crop_name)

    # Save to SQLite scans table if diagnosis is confident
    if not result.get('isRecaptureRecommended', False):
        conn = get_db_connection()
        cursor = conn.cursor()
        scan_id = f"scan_{int(datetime.now().timestamp())}"
        cursor.execute("""
            INSERT INTO scans (id, user_id, timestamp, crop_name, condition, pathogen_type, confidence, severity, symptoms_json)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            scan_id,
            user_id,
            datetime.now().isoformat(),
            crop_name,
            result['predictedCondition'],
            result['pathogenType'],
            result['confidenceScore'],
            result['severity'],
            json.dumps(result['visibleSymptoms'])
        ))
        conn.commit()
        conn.close()
        result['id'] = scan_id

    return jsonify(result), 200

@app.route('/api/scans/history', methods=['GET'])
def get_history():
    user_id = request.args.get('userId', 'demo_user')
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, timestamp, crop_name, condition, pathogen_type, confidence, severity, symptoms_json
        FROM scans WHERE user_id = ? ORDER BY timestamp DESC
    """, (user_id,))
    rows = cursor.fetchall()
    conn.close()

    history = []
    for r in rows:
        history.append({
            "id": r['id'],
            "timestamp": r['timestamp'],
            "cropName": r['crop_name'],
            "predictedCondition": r['condition'],
            "pathogenType": r['pathogen_type'],
            "confidenceScore": r['confidence'],
            "severity": r['severity'],
            "visibleSymptoms": json.loads(r['symptoms_json'])
        })

    return jsonify(history), 200

if __name__ == '__main__':
    print("=" * 65)
    print(" AGRISCAN PYTHON FLASK OFFLINE ENGINE STARTING ON LOCALHOST")
    print(" SQLite Database: agriscan.db")
    print(" Open in Browser: http://127.0.0.1:5000")
    print("=" * 65)
    app.run(host='127.0.0.1', port=5000, debug=True)
