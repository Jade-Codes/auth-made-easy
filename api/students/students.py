

import json
from typing import List
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel


router = APIRouter(
    prefix="/api/students",
    responses={404: {"description": "Endpoint not found"}}
)

class Student(BaseModel):
    id: int
    firstName: str
    lastName: str
    email: str
    dateOfBirth: str
    enrollmentDate: str

def read_students():
    with open('./api/students/students.json', 'r') as file:
        return json.load(file)

def write_students(students):
    with open('./api/students/students.json', 'w') as file:
        json.dump(students, file, indent=2)

@router.get("/", response_model=List[Student])
async def get_students():
    return read_students()

@router.get("/{student_id}", response_model=Student)
async def get_student(student_id: int):
    students = read_students()
    student = next((s for s in students if s['id'] == student_id), None)
    if student:
        return student
    raise HTTPException(status_code=404, detail="Student not found")

@router.post("/", response_model=Student)
async def create_student(student: Student):
    students = read_students()
    student.id = max(s['id'] for s in students) + 1
    students.append(student.model_dump())
    write_students(students)
    return student

@router.put("/{student_id}", response_model=Student)
async def update_student(student_id: int, updated_student: Student):
    students = read_students()
    student = next((s for s in students if s['id'] == student_id), None)
    if student:
        student.update(updated_student.model_dump(exclude={'id'}))
        write_students(students)
        return student
    raise HTTPException(status_code=404, detail="Student not found")

@router.delete("/{student_id}")
async def delete_student(student_id: int):
    students = read_students()
    students = [s for s in students if s['id'] != student_id]
    write_students(students)
    return {"message": "Student deleted successfully"}
