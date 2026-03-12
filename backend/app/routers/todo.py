from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session 

from .. import schemas, crud, database

router = APIRouter(
    prefix="/todos",
    tags=["todos"]
)

@router.get("/", response_model=list[schemas.TodoResponse])
def get_todos(db: Session = Depends(database.get_db)):
    return crud.get_todos(db)

@router.post("/", response_model=schemas.TodoResponse)
def create_Todo(todo: schemas.TodoCreate, db: Session = Depends(database.get_db)):
    return crud.create_todo(db, todo)

@router.put("/{todo_id}")
def update_todo(todo_id: int, task: str, db: Session = Depends(database.get_db)):
    return crud.update_todo(db, todo_id, task)

@router.delete("/{todo_id}")
def delete_todo(todo_id: int, db: Session = Depends(database.get_db)):
    return crud.delete_todo(db, todo_id)

@router.put("/{todo_id}/toggle")
def toggle_todo(todo_id: int, db: Session = Depends(database.get_db)):
    return crud.toggle_todo(db, todo_id)


