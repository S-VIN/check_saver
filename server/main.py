from fastapi import FastAPI
from router import *

app = FastAPI()

app.include_router(router)
