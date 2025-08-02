from database import Base
from sqlalchemy import Text, Column, Integer, Enum, String

from enums import Difficulty, Status


class Tasks(Base):
    __tablename__ = 'tasks'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100))
    description = Column(Text)
    difficulty = Column(Enum(Difficulty), nullable=False, default=Difficulty.easy)
    status = Column(Enum(Status), nullable=False, default=Status.todo)
