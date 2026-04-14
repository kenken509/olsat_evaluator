import axios from "axios";
import { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import Swal from "sweetalert2";

export default function UsersCreateModal({ open, onClose, onCreated }) {
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
        if (!open) {
            setForm(initialForm);
            setErrors({});
            setSubmitting(false);
        }
    }, [open]);

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

        try {
            setSubmitting(true);
            setErrors({});

            await axios.post("/admin-panel/users", form);

            await Swal.fire({
                icon: "success",
                title: "User created",
                text: "The new user has been added successfully.",
                confirmButtonColor: "#7A1C1C",
            });

            onCreated();
        } catch (error) {
            if (error?.response?.status === 422) {
                setErrors(error.response.data.errors || {});
            } else {
                await Swal.fire({
                    icon: "error",
                    title: "Creation failed",
                    text: "Something went wrong while creating the user.",
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
                <div className="flex min-h-full items-center justify-center p-4">
                    <DialogPanel className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
                        <div className="flex items-center justify-between border-b border-primary/10 px-6 py-4">
                            <DialogTitle className="text-lg font-bold text-primary">
                                Create New User
                            </DialogTitle>

                            <button
                                type="button"
                                onClick={handleClose}
                                disabled={submitting}
                                className="cursor-pointer text-2xl leading-none text-primary disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                ×
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5 p-6">
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
                                        className="w-full rounded-xl border border-primary/20 bg-app px-4 py-2 text-app outline-none focus:ring-2 focus:ring-accent"
                                    />
                                    {errors.fname && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.fname[0]}
                                        </p>
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
                                        className="w-full rounded-xl border border-primary/20 bg-app px-4 py-2 text-app outline-none focus:ring-2 focus:ring-accent"
                                    />
                                    {errors.lname && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.lname[0]}
                                        </p>
                                    )}
                                </div>

                                <div className="md:col-span-2">
                                    <label className="mb-1 block text-sm font-semibold text-primary">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={form.email}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-primary/20 bg-app px-4 py-2 text-app outline-none focus:ring-2 focus:ring-accent"
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.email[0]}
                                        </p>
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
                                        className="w-full rounded-xl border border-primary/20 bg-white px-4 py-2 text-app outline-none focus:ring-2 focus:ring-accent"
                                    >
                                        <option value="admin">Admin</option>
                                        <option value="faculty">Faculty</option>
                                        <option value="evaluator">Evaluator</option>
                                    </select>
                                    {errors.role && (
                                        <p className="mt-1 text-xs text-red-600">
                                            {errors.role[0]}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                                A temporary default password will be assigned automatically.
                                The user will be required to change it on first login.
                            </div>

                            <div className="flex justify-end gap-3 border-t border-primary/10 pt-4">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    disabled={submitting}
                                    className="cursor-pointer rounded-xl border border-primary/20 px-4 py-2 text-sm font-semibold text-primary hover:bg-app disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="cursor-pointer rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {submitting ? "Creating..." : "Create User"}
                                </button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
}