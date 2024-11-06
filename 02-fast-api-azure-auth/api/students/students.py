

import json
from fastapi import APIRouter


router = APIRouter(
    prefix="/api/students",
    responses={404: {"description": "Endpoint not found"}}
)

@router.get("/")
async def get_students():
    with open('./students/students.json', 'r', encoding='utf-8') as file_object:
        return json.load(file_object)