"""
AgriScan SQLite Database Engine
Initializes schemas and provides connection helpers for users, scans, and field notes.
"""

import sqlite3
import os

DB_FILE = os.path.join(os.path.dirname(__file__), 'agriscan.db')

def get_db_connection():
    """Returns a SQLite connection with row factory enabled."""
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    """Creates SQLite tables if they do not exist."""
    conn = get_db_connection()
    cursor = conn.cursor()

    # 1. Users Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            full_name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            phone TEXT,
            password_hash TEXT NOT NULL,
            state TEXT,
            district TEXT,
            preferred_language TEXT,
            main_crop TEXT,
            created_at TEXT
        )
    """)

    # 2. Diagnostic Scans Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS scans (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            timestamp TEXT NOT NULL,
            crop_name TEXT NOT NULL,
            condition TEXT NOT NULL,
            pathogen_type TEXT NOT NULL,
            confidence REAL NOT NULL,
            severity TEXT NOT NULL,
            symptoms_json TEXT,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    # 3. Field Notes Table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS field_notes (
            id TEXT PRIMARY KEY,
            user_id TEXT NOT NULL,
            date TEXT NOT NULL,
            title TEXT NOT NULL,
            crop TEXT NOT NULL,
            plot_location TEXT,
            observation TEXT NOT NULL,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
    """)

    conn.commit()
    conn.close()

if __name__ == '__main__':
    init_db()
    print("AgriScan SQLite Database successfully initialized:", DB_FILE)
