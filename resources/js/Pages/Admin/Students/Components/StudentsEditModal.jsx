import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Swal from "sweetalert2";

export default function StudentsEditModal({ open, student, onClose, onUpdated }) {
    const initialForm = {
        student_id: "",
        fname: "",
        mname: "",
        lname: "",
        sex: "Male",
        birthdate: "",
        incoming_grade_level: "",
        previous_school: "",
        is_active: true,
    };

    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (open && student) {
            setForm({
                student_id: student.student_id || "",
                fname: student.fname || "",
                mname: student.mname || "",
                lname: student.lname || "",
                sex: student.sex || "Male",
                birthdate: student.birthdate || "",
                incoming_grade_level: student.incoming_grade_level || "",
                previous_school: student.previous_school || "",
                is_active: Boolean(student.is_active),
            });
            setErrors({});
        }

        if (!open) {
            setForm(initialForm);
            setErrors({});
            setSubmitting(false);
        }
    }, [open, student]);

    const handleClose = () => {
        if (submitting) return;
        onClose();
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!student?.id) return;

        try {
            setSubmitting(true);
            setErrors({});

            await axios.put(`/admin-panel/students/${student.id}`, form);

            await Swal.fire({
                icon: "success",
                title: "Student updated",
                text: "The student has been updated successfully.",
                confirmButtonColor: "#7A1C1C",
            });

            onUpdated();
        } catch (error) {
            if (error?.response?.status === 422) {
                const data = error.response.data;

                if (data.errors) {
                    setErrors(data.errors);
                } else if (data.message) {
                    await Swal.fire({
                        icon: "warning",
                        title: "Unable to update student",
                        text: data.message,
                        confirmButtonColor: "#7A1C1C",
                    });
                }
            } else {
                await Swal.fire({
                    icon: "error",
                    title: "Update failed",
                    text: "Something went wrong while updating the student.",
                    confirmButtonColor: "#7A1C1C",
                });
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-start justify-center p-4 pt-8">
                    <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-primary/10 px-5 py-4">
                            <DialogTitle className="text-lg font-bold text-primary">
                                Edit Student
                            </DialogTitle>

                            <button
                                type="button"
                                onClick={handleClose}
                                className="cursor-pointer text-xl font-bold text-primary"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 p-5">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-primary">
                                        Student ID
                                    </label>
                                    <input
                                        type="text"
                                        name="student_id"
                                        value={form.student_id}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-primary/20 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                                    />
                                    {errors.student_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.student_id[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-primary">
                                        Sex
                                    </label>
                                    <select
                                        name="sex"
                                        value={form.sex}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-primary/20 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                                    >
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                    </select>
                                    {errors.sex && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.sex[0]}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-primary">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        name="fname"
                                        value={form.fname}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-primary/20 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                                    />
                                    {errors.fname && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.fname[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-primary">
                                        Middle Name
                                    </label>
                                    <input
                                        type="text"
                                        name="mname"
                                        value={form.mname}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-primary/20 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                                    />
                                    {errors.mname && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.mname[0]}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-primary">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        name="lname"
                                        value={form.lname}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-primary/20 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                                    />
                                    {errors.lname && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.lname[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-primary">
                                        Birthdate
                                    </label>
                                    <input
                                        type="date"
                                        name="birthdate"
                                        value={form.birthdate ?? ""}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-primary/20 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                                    />
                                    {errors.birthdate && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.birthdate[0]}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-primary">
                                        Incoming Grade Level
                                    </label>
                                    <select
                                        name="incoming_grade_level"
                                        value={form.incoming_grade_level}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-primary/20 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                                    >
                                        <option value="">Select grade</option>
                                        {Array.from({ length: 12 }, (_, i) => (
                                            <option key={i + 1} value={i + 1}>
                                                Grade {i + 1}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.incoming_grade_level && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.incoming_grade_level[0]}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-semibold text-primary">
                                        Previous School
                                    </label>
                                    <input
                                        type="text"
                                        name="previous_school"
                                        value={form.previous_school}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-primary/20 bg-white px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                                    />
                                    {errors.previous_school && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.previous_school[0]}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-sm font-semibold text-primary">
                                    <input
                                        type="checkbox"
                                        name="is_active"
                                        checked={form.is_active}
                                        onChange={handleChange}
                                        className="h-4 w-4"
                                    />
                                    Active
                                </label>
                            </div>

                            <div className="flex justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="cursor-pointer rounded-xl border border-primary/20 px-4 py-2 font-semibold text-primary"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="cursor-pointer rounded-xl bg-primary px-4 py-2 font-semibold text-white disabled:opacity-60"
                                >
                                    {submitting ? "Updating..." : "Update Student"}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}