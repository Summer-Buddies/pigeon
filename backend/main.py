from fastapi import FastAPI
from dotenv import load_dotenv
import os

app = FastAPI()

load_dotenv()  # take environment variables from .env.

DATABASE_URL = os.getenv("DATABASE_URL")

@app.get("/")
def read_root():
    return {"Hello": "World"}

