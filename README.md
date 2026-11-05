# AgriScan - Offline Python Flask & SQLite Backend Server
## Department of Computer Science & Engineering Capstone Project

This directory contains the complete standalone Python Flask backend for the **AgriScan** system.

### Prerequisites
- Python 3.9+ installed on your localhost machine.
- Pip package manager.

### 1. Installation Instructions
Open your terminal in this directory:
```bash
cd backend-python-flask
python -m venv venv

# On Linux/macOS:
source venv/bin/activate

# On Windows:
venv\Scripts\activate

# Install required offline libraries:
pip install -r requirements.txt
```

### 2. Run the Localhost Server
```bash
python app.py
```
Output will confirm:
```
=================================================================
 AGRISCAN PYTHON FLASK OFFLINE ENGINE STARTING ON LOCALHOST
 SQLite Database: agriscan.db
 Open in Browser: http://127.0.0.1:5000
=================================================================
```

### 3. API Endpoints
- `GET  /api/health` - Verifies offline operational status.
- `POST /api/auth/register` - Registers farmer with SHA-256 hashed password.
- `POST /api/auth/login` - Authenticates user from local SQLite table.
- `POST /api/scans/analyze` - Executes Computer Vision leaf analysis.
- `GET  /api/scans/history` - Returns local scan logs.

### 4. Zero Cloud Connectivity
No external internet access or third-party cloud API keys are needed. All diagnostic processing occurs on CPU via local algorithms and SQLite file storage.
