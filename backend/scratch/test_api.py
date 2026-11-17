import os
import sys
import unittest
from fastapi.testclient import TestClient

# Adjust path to import app modules
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Override settings database url to sqlite for isolated testing
os.environ["DATABASE_URL"] = "sqlite:///./test_run.db"

# Now import database engine, Base, and settings to ensure override is applied
from app.core.database import Base, engine, SessionLocal
from app.main import app

class TestSchoolCMS(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Create database tables for sqlite testing
        Base.metadata.create_all(bind=engine)
        
        # Manually seed default admin for test client validation
        db = SessionLocal()
        try:
            from app.modules.auth.models import User
            from app.core.security import get_password_hash
            
            admin_user = db.query(User).filter(User.username == "admin").first()
            if not admin_user:
                admin_user = User(
                    username="admin",
                    email="admin@brotherhoodschool.edu.in",
                    hashed_password=get_password_hash("admin123"),
                    role="Super Admin"
                )
                db.add(admin_user)
                db.commit()
        finally:
            db.close()
            
        cls.client = TestClient(app)

    @classmethod
    def tearDownClass(cls):
        # Dispose of engine connection pool to release file locks on Windows
        engine.dispose()
        
        if os.path.exists("test_run.db"):
            try:
                os.remove("test_run.db")
            except Exception as e:
                print(f"Cleanup warning: Could not delete test_run.db: {e}")
                
        if os.path.exists("uploads"):
            import shutil
            shutil.rmtree("uploads", ignore_errors=True)

    def test_01_health_check(self):
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["status"], "healthy")

    def test_02_version(self):
        response = self.client.get("/api/version")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["version"], "1.0.0")

    def test_03_login_failure(self):
        response = self.client.post(
            "/api/auth/token/",
            json={"username": "wrong_user", "password": "wrong_password"}
        )
        self.assertEqual(response.status_code, 401)

    def test_04_login_success(self):
        response = self.client.post(
            "/api/auth/token/",
            json={"username": "admin", "password": "admin123"}
        )
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("access", data)
        self.assertIn("refresh", data)
        self.__class__.token = data["access"]

    def test_05_profile_access(self):
        headers = {"Authorization": f"Bearer {self.__class__.token}"}
        response = self.client.get("/api/auth/profile/", headers=headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data["username"], "admin")
        self.assertEqual(data["role"], "Super Admin")

    def test_06_announcement_crud(self):
        headers = {"Authorization": f"Bearer {self.__class__.token}"}
        
        # 1. List is initially empty
        response = self.client.get("/api/announcements/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

        # 2. Create
        payload = {
            "title": "Semester Exams",
            "message": "Exams start from next Monday.",
            "priority": "High",
            "status": "Active"
        }
        response = self.client.post("/api/announcements/", json=payload, headers=headers)
        self.assertEqual(response.status_code, 201)
        data = response.json()
        self.assertEqual(data["title"], "Semester Exams")
        self.assertIn("id", data)
        ann_id = data["id"]

        # 3. Update
        update_payload = {"priority": "Medium"}
        response = self.client.put(f"/api/announcements/{ann_id}/", json=update_payload, headers=headers)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()["priority"], "Medium")

        # 4. Delete
        response = self.client.delete(f"/api/announcements/{ann_id}/", headers=headers)
        self.assertEqual(response.status_code, 200)

        # 5. List is empty again
        response = self.client.get("/api/announcements/")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()), 0)

    def test_07_public_contact_messages(self):
        payload = {
            "name": "John Doe",
            "email": "johndoe@example.com",
            "phone": "9876543210",
            "subject": "Inquiry about admissions",
            "message": "Please send admission timeline details."
        }
        response = self.client.post("/api/contact-messages/", json=payload)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json()["name"], "John Doe")

    def test_08_media_upload_fallback(self):
        headers = {"Authorization": f"Bearer {self.__class__.token}"}
        # Simulate file upload
        file_content = b"fake image bytes data"
        files = {"file": ("test_avatar.png", file_content, "image/png")}
        response = self.client.post("/api/media/upload/", files=files, headers=headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("url", data)
        self.assertTrue(data["url"].startswith("http://127.0.0.1:8000/uploads/"))

if __name__ == "__main__":
    unittest.main()
