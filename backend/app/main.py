from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine, Base
from app.routers import todo

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Todo API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(todo.router)


@app.get("/")
def root():
    return {"message": "Todo API running"}