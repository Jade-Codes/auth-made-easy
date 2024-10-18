import { Student, deleteStudent } from '../../services/student-api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface StudentDeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

function StudentDeleteConfirmationModal({ isOpen, onClose, student }: StudentDeleteConfirmationModalProps) {
    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
      mutationFn: deleteStudent,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['students'] });
        onClose();
      },
    });
  
    if (!isOpen || !student) return null;
  
    const handleDelete = () => {
      deleteMutation.mutate(student.id);
    };
  
    return (
      <div className="modal modal-open">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Confirm Deletion</h3>
          <p className="py-4">Are you sure you want to delete {student.firstName} {student.lastName}?</p>
          <div className="modal-action">
            <button className="btn btn-error" onClick={handleDelete} disabled={deleteMutation.isPending}>
              {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
            </button>
            <button className="btn" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    );
}

export default StudentDeleteConfirmationModal;