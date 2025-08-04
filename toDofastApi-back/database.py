from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os
username = os.getenv('DB_USERNAME')
password = os.environ.get('DB_PASSWORD')

engine = create_engine(f'postgresql://{username}:{password}@localhost:5432/todoDb')
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()
