from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database import get_db, Base
from main import app
from fastapi.testclient import TestClient
from models import Tasks

db_url = 'sqlite:///test.db'
engine = create_engine(db_url, connect_args={'check_same_thread': False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)


# Dependency override
def get_test_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = get_test_db

client = TestClient(app)
