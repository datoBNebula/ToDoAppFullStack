from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from typing import List
# from AIIntegration import suggest_tasks

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:19006",  # Expo web
    "http://localhost:8081",   # dev servers
    "http://127.0.0.1:8081",
    "http://localhost:8082",  # dev servers
    "http://127.0.0.1:8082",
    "http://localhost:8000/",
    # optional
    "http://localhost:8000",   # optional backend view
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import router

app.include_router(router.router)



