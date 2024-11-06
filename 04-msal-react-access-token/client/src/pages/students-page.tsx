import { useState } from 'react';
import { useStudents } from '../hooks/use-student'
import { Student } from '../services/student-api'
import StudentFormModal from '../components/students/student-form-modal';
import StudentDeleteConfirmationModal from '../components/students/student-delete-model';

function StudentsPage() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const { data: students, isLoading, error } = useStudents()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>An error occurred: {error.message}</div>

  const handleCreateClick = () => {
    setSelectedStudent(null);
    setIsFormModalOpen(true);
  };

  const handleEditClick = (student: Student) => {
    setSelectedStudent(student);
    setIsFormModalOpen(true);
  };

  const handleDeleteClick = (student: Student) => {
    setSelectedStudent(student);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student List</h1>
      <button className="btn btn-primary mb-4" onClick={handleCreateClick}>
        Create New Student
      </button>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Enrollment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students?.map((student: Student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.dateOfBirth}</td>
                <td>{student.enrollmentDate}</td>
                <td>
                  <button className="btn btn-primary mr-2" onClick={() => handleEditClick(student)}>Edit</button>
                  <button onClick={() => handleDeleteClick(student)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <StudentFormModal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        student={selectedStudent}
      />
      <StudentDeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        student={selectedStudent}
      />
    </div>
  )
}

export default StudentsPage