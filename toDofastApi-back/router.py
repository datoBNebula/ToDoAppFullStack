from typing import List
from fastapi import Depends, Query
from AIIntegration import suggest_tasks

from fastapi import APIRouter
from fastapi import HTTPException
from typing import List

import models
from schema import TaskGet, TaskCreation
from sqlalchemy.orm import Session
from database import get_db
router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

@router.get("/make/suggestions")
async def get_suggestions(tasks: list = Query()):
    if tasks:
        return suggest_tasks(tasks)
    else:
        return {'message': 'No tasks found'}


@router.get("/", response_model=List[TaskGet])
async def get_task(db: Session = Depends(get_db)):
    try:
        tasks = db.query(models.Tasks).all()
        return tasks
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.get("/{id}", response_model=TaskGet)
async def get_task(id: int, db: Session = Depends(get_db)):
    try:
        task = db.query(models.Tasks).filter(models.Tasks.id == id).first()
        return task
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.post("/", response_model=TaskGet)
async def create_task(task: TaskCreation, db: Session = Depends(get_db)):
    new_task = models.Tasks(
        name=task.name,
        description=task.description,
        difficulty=task.difficulty,
        status=task.status,
    )
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@router.delete("/{id}", status_code=200)
async def delete_task(id: int, db: Session = Depends(get_db)):
    delete_task = db.query(models.Tasks).filter(models.Tasks.id == id).first()
    if delete_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(delete_task)
    db.commit()
    return {'message': f"Task - {delete_task.name} has been deleted successfully!"}


@router.put("/{id}", response_model=TaskGet)
async def update_task(id: int, task: TaskCreation, db: Session = Depends(get_db)):
    existing_task = db.query(models.Tasks).filter(models.Tasks.id == id).first()
    if existing_task is None:
        raise HTTPException(status_code=404, detail=f"not found the task")
    try:
        for field, value in task.model_dump(exclude_unset=True).items():
            setattr(existing_task, field, value)
        db.commit()
        db.refresh(existing_task)
        return existing_task
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


