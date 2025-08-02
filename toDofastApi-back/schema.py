from pydantic import BaseModel
from enums import Difficulty, Status


class TaskCreation(BaseModel):
    name: str
    description: str
    difficulty: Difficulty
    status: Status

    class Config:
        from_attributes = True


class TaskGet(TaskCreation):
    id: int
    class Config:
        from_attributes = True