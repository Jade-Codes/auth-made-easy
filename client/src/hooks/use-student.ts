import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getStudents, getStudent, updateStudent, deleteStudent, Student } from '../services/student-api';

export const useStudents = () => {
  return useQuery({
    queryKey: ['students'],
    queryFn: getStudents
  });
};

export const useStudent = (id: number) => {
  return useQuery({
    queryKey: ['student', id],
    queryFn: () => getStudent(id)
  });
};

export const useUpdateStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Student }) => updateStudent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};

export const useDeleteStudent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStudent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
    },
  });
};