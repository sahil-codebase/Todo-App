from pydantic import BaseModel


class TodoBase(BaseModel):
    task: str


class TodoCreate(TodoBase):
    pass

class TodoResponse(TodoBase):
    id: int
    task: str
    completed: bool

    class Config:
        orm_mode = True