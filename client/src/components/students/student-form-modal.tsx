import React, { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Student, createStudent, updateStudent } from '../../services/student-api';

interface StudentFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    student: Student | null;
}

function StudentFormModal({ isOpen, onClose, student }: StudentFormModalProps) {
    const [formData, setFormData] = useState<Partial<Student>>({});
    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: createStudent,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            onClose();
        },
    });

    const updateMutation = useMutation({
        mutationFn: (data: Student) => updateStudent(data.id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['students'] });
            onClose();
        },
    });

    useEffect(() => {
        if (student) {
            setFormData(student);
        } else {
            setFormData({});
        }
    }, [student]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (student) {
            updateMutation.mutate(formData as Student);
        } else {
            student = {
                id: 0,
                firstName: formData.firstName || '',
                lastName: formData.lastName || '',
                email: formData.email || '',
                dateOfBirth: formData.dateOfBirth || '',
                enrollmentDate: formData.enrollmentDate || ''
            }
            createMutation.mutate(student);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{student ? 'Edit Student' : 'Create New Student'}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName || ''}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            value={formData.lastName || ''}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email || ''}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date of Birth</span>
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth || ''}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Enrollment Date</span>
                        </label>
                        <input
                            type="date"
                            name="enrollmentDate"
                            value={formData.enrollmentDate || ''}
                            onChange={handleChange}
                            className="input input-bordered"
                            required
                        />
                    </div>

                    <div className="modal-action">
                        <button type="submit" className="btn btn-primary" disabled={createMutation.isPending || updateMutation.isPending}>
                            {createMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save'}
                        </button>
                        <button type="button" className="btn" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default StudentFormModal;