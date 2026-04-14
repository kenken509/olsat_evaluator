import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Swal from "sweetalert2";

export default function UsersEditModal({ open, user, onClose, onUpdated }) {
    const initialForm = {
        fname: "",
        lname: "",
        email: "",
        role: "faculty",
    };

    const [form, setForm] = useState(initialForm);
    const [submitting, setSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (open && user) {
            setForm({
                fname: user.fname || "",
                lname: user.lname || "",
                email: user.email || "",
                role: user.role || "faculty",
            });
            setErrors({});
        }

        if (!open) {
            setForm(initialForm);
            setErrors({});
            setSubmitting(false);
        }
    }, [open, user]);

    const handleClose = () => {
        if (submitting) return;
        onClose();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user?.id) return;

        try {
            setSubmitting(true);
            setErrors({});
            
            await axios.put(`/admin-panel/users/${user.id}`, form);

            await Swal.fire({
                icon: "success",
                title: "User updated",
                text: "The user has been updated successfully.",
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
                        title: "Unable to update user",
                        text: data.message,
                        confirmButtonColor: "#7A1C1C",
                    });
                }
            } else {
                await Swal.fire({
                    icon: "error",
                    title: "Update failed",
                    text: "Something went wrong while updating the user.",
                    confirmButtonColor: "#7A1C1C",
                });
            }
        }finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} className="relative z-50">
            <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

            <div className="fixed inset-0 flex items-center justify-center p-4">
                <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
                    <div className="flex items-center justify-between border-b border-primary/10 px-6 py-4">
                        <DialogTitle className="text-lg font-bold text-primary">
                            Edit User
                        </DialogTitle>

                        <button
                            type="button"
                            onClick={handleClose}
                            className="text-xl font-bold text-primary"
                        >
                            ×
                        </button>
                    </div>   

                    <form onSubmit={handleSubmit} className="space-y-4 p-6">
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
                                    className="w-full rounded-xl border border-primary/20 px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                                />
                                {errors.fname && (
                                    <p className="mt-1 text-sm text-red-600">{errors.fname[0]}</p>
                                )}
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-semibold text-primary">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lname"
                                    value={form.lname}
                                    onChange={handleChange}
                                    className="w-full rounded-xl border border-primary/20 px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                                />
                                {errors.lname && (
                                    <p className="mt-1 text-sm text-red-600">{errors.lname[0]}</p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-primary">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-primary/20 px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                            />
                            {errors.email && (
                                <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
                            )}
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-primary">
                                Role
                            </label>
                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="w-full rounded-xl border border-primary/20 px-4 py-2 outline-none focus:ring-2 focus:ring-accent"
                            >
                                <option value="admin">Admin</option>
                                <option value="faculty">Faculty</option>
                                <option value="evaluator">Evaluator</option>
                            </select>
                            {errors.role && (
                                <p className="mt-1 text-sm text-red-600">{errors.role[0]}</p>
                            )}
                        </div>

                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="rounded-xl border border-primary/20 px-4 py-2 font-semibold text-primary"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="rounded-xl bg-primary px-4 py-2 font-semibold text-white disabled:opacity-60"
                            >
                                {submitting ? "Updating..." : "Update User"}
                            </button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </Dialog>
    );
}