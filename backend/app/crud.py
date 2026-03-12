from sqlalchemy .orm import Session
from . import models, schemas

def get_todos(db: Session):
    return db.query(models.Todo).all()

def create_todo(db:Session, todo: schemas.TodoCreate):
    db_todo = models.Todo(task=todo.task)
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo

def update_todo(db: Session, todo_id: int, task: str):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()

    if todo:
        todo.task = task
        db.commit()
        db.refresh(todo)

    return todo

def delete_todo(db:Session, todo_id:int):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()
    if todo:
        db.delete(todo)
        db.commit()

    return todo

def toggle_todo(db: Session, todo_id: int):
    todo = db.query(models.Todo).filter(models.Todo.id == todo_id).first()

    if todo:
        todo.completed = not todo.completed
        db.commit()
        db.refresh(todo)

    return todo
