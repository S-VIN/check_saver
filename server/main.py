from fastapi import FastAPI
from get import *
from post import *

app = FastAPI()

app.include_router(router)
