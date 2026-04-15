import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";
import StudentsCreateModal from "./Components/StudentsCreateModal";
import StudentsEditModal from "./Components/StudentsEditModal";

export default function Index() {
    const [editOpen, setEditOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [createOpen, setCreateOpen] = useState(false);
    const [students, setStudents] = useState([]);
    const [meta, setMeta] = useState(null);

    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);

    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [view, setView] = useState("active");

    const debounceRef = useRef(null);
    const abortRef = useRef(null);

    const fetchStudents = async ({
        page = 1,
        query = search,
        per_page = perPage,
        currentView = view,
        showLoading = false,
    } = {}) => {
        if (abortRef.current) {
            abortRef.current.abort();
        }

        const controller = new AbortController();
        abortRef.current = controller;

        if (showLoading) {
            setLoading(true);
        } else {
            setFetching(true);
        }

        try {
            const response = await axios.get("/admin-panel/students-all", {
                params: {
                    page,
                    q: query.trim(),
                    per_page,
                    view: currentView,
                },
                signal: controller.signal,
            });

            setStudents(response.data.data);
            setMeta(response.data);
        } catch (error) {
            if (error?.code !== "ERR_CANCELED") {
                console.error("Failed to fetch students:", error);
            }
        } finally {
            setLoading(false);
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchStudents({
            page: 1,
            query: "",
            per_page: 10,
            currentView: "active",
            showLoading: true,
        });

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            if (abortRef.current) abortRef.current.abort();
        };
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            fetchStudents({
                page: 1,
                query: search,
                per_page: perPage,
                currentView: view,
            });
        }, 400);

        return () => clearTimeout(debounceRef.current);
    }, [search]);

    useEffect(() => {
        fetchStudents({
            page: 1,
            query: search,
            per_page: perPage,
            currentView: view,
        });
    }, [view]);

    const handlePerPageChange = (e) => {
        const value = Number(e.target.value);
        setPerPage(value);

        fetchStudents({
            page: 1,
            query: search,
            per_page: value,
            currentView: view,
        });
    };

    const handleViewChange = (nextView) => {
        if (nextView === view) return;
        setView(nextView);
        setSearch("");
    };

    const goToPage = (url) => {
        if (!url) return;

        const parsedUrl = new URL(url);
        const page = parsedUrl.searchParams.get("page") || 1;

        fetchStudents({
            page,
            query: search,
            per_page: perPage,
            currentView: view,
        });
    };

    const handleDeleteOrRestore = async (student) => {
        const isArchivedView = view === "archived";
        const fullName = `${student.fname} ${student.lname}`;

        const result = await Swal.fire({
            title: isArchivedView ? "Restore student?" : "Archive student?",
            text: isArchivedView
                ? `Do you want to restore ${fullName}?`
                : `Do you want to archive ${fullName}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: isArchivedView ? "#15803d" : "#7A1C1C",
            cancelButtonColor: "#6b7280",
            confirmButtonText: isArchivedView ? "Yes, restore" : "Yes, archive",
            cancelButtonText: "Cancel",
            reverseButtons: true,
        });

        if (!result.isConfirmed) return;

        try {
            setFetching(true);

            if (isArchivedView) {
                await axios.patch(`/admin-panel/students/${student.id}/restore`);
            } else {
                await axios.delete(`/admin-panel/students/${student.id}`);
            }

            await Swal.fire({
                icon: "success",
                title: isArchivedView ? "Student restored" : "Student archived",
                text: isArchivedView
                    ? `${fullName} has been restored successfully.`
                    : `${fullName} has been archived successfully.`,
                confirmButtonColor: "#7A1C1C",
            });

            fetchStudents({
                page: meta?.current_page ?? 1,
                query: search,
                per_page: perPage,
                currentView: view,
            });
        } catch (error) {
            console.error(
                isArchivedView ? "Failed to restore student:" : "Failed to archive student:",
                error
            );

            Swal.fire({
                icon: "error",
                title: "Action failed",
                text: isArchivedView
                    ? "Failed to restore student."
                    : "Failed to archive student.",
                confirmButtonColor: "#7A1C1C",
            });

            setFetching(false);
        }
    };

    const handleCreated = () => {
        setCreateOpen(false);

        fetchStudents({
            page: 1,
            query: search,
            per_page: perPage,
            currentView: view,
        });
    };

    const handleEdit = (student) => {
        setSelectedStudent(student);
        setEditOpen(true);
    };

    const handleUpdated = () => {
        setEditOpen(false);
        setSelectedStudent(null);

        fetchStudents({
            page: meta?.current_page ?? 1,
            query: search,
            per_page: perPage,
            currentView: view,
        });
    };
    
    return (
        <AdminLayout>
            <div className="space-y-4">
                <div className="rounded-2xl bg-white shadow-sm">
                    <div className="p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_160px] md:items-end">
                            <div className="w-full">
                                <label className="mb-1 block text-sm font-semibold text-primary">
                                    Search Students
                                </label>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={
                                        view === "active"
                                            ? "Search active students by student ID, name, or previous school..."
                                            : "Search archived students by student ID, name, or previous school..."
                                    }
                                    className="w-full rounded-xl border border-primary/20 bg-app px-4 py-2 text-app outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>

                            <div className="w-full">
                                <label className="mb-1 block text-sm font-semibold text-primary">
                                    Show Entries
                                </label>
                                <select
                                    value={perPage}
                                    onChange={handlePerPageChange}
                                    className="w-full rounded-xl border border-primary/20 bg-white px-4 py-2 text-app outline-none focus:ring-2 focus:ring-accent"
                                >
                                    <option value={10}>10</option>
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                    <option value={50}>50</option>
                                </select>
                            </div>
                        </div>

                        {fetching && (
                            <div className="mt-2 text-xs text-gray-400">
                                Updating results...
                            </div>
                        )}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-primary/10 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => handleViewChange("active")}
                                className={[
                                    "rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer",
                                    view === "active"
                                        ? "bg-primary text-white"
                                        : "border border-primary/20 bg-white text-primary hover:bg-app",
                                ].join(" ")}
                            >
                                Active
                            </button>

                            <button
                                type="button"
                                onClick={() => handleViewChange("archived")}
                                className={[
                                    "rounded-xl px-4 py-2 text-sm font-semibold transition cursor-pointer",
                                    view === "archived"
                                        ? "bg-primary text-white"
                                        : "border border-primary/20 bg-white text-primary hover:bg-app",
                                ].join(" ")}
                            >
                                Archived
                            </button>
                        </div>

                        <button
                            type="button"
                            onClick={() => setCreateOpen(true)}
                            className="rounded-xl bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90 cursor-pointer"
                        >
                            + New
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-primary text-white">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Student ID</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Sex</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Incoming Grade</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Previous School</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-10 text-center text-app">
                                            Loading students...
                                        </td>
                                    </tr>
                                ) : students.length > 0 ? (
                                    students.map((student) => (
                                        <tr
                                            key={student.id}
                                            className="border-b border-primary/10 last:border-b-0 hover:bg-gray-50 "
                                        >
                                            <td className="px-6 py-4 text-sm text-app">{student.id}</td>
                                            <td className="px-6 py-4 text-sm font-semibold text-app">
                                                {student.student_id}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-app">
                                                {student.fname} {student.mname ? `${student.mname} ` : ""}{student.lname}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-app">{student.sex}</td>
                                            <td className="px-6 py-4 text-sm text-app">
                                                Grade {student.incoming_grade_level}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-app">
                                                {student.previous_school ?? "—"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {view === "archived" ? (
                                                    <span className="rounded-full border border-primary px-3 py-1 text-xs font-bold text-primary">
                                                        Archived
                                                    </span>
                                                ) : student.is_active ? (
                                                    <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="rounded-full border border-primary px-3 py-1 text-xs font-bold text-primary">
                                                        Inactive
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-center">
                                                <div className="flex items-center justify-center gap-4">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleEdit(student)}
                                                        className="cursor-pointer"
                                                        title="Edit"
                                                    >
                                                        <FaRegEdit className="text-lg text-green-800" />
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteOrRestore(student)}
                                                        title={view === "archived" ? "Restore" : "Archive"}
                                                        className="cursor-pointer"
                                                    >
                                                        <MdOutlineDelete
                                                            className={[
                                                                "text-xl",
                                                                view === "archived"
                                                                    ? "text-green-700"
                                                                    : "text-primary",
                                                            ].join(" ")}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="8" className="px-6 py-10 text-center text-app">
                                            {view === "active"
                                                ? "No active students found."
                                                : "No archived students found."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {meta?.links?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {meta.links.map((link, index) => (
                            <button
                                key={index}
                                disabled={!link.url}
                                onClick={() => goToPage(link.url)}
                                className={[
                                    "rounded-xl border px-4 py-2 text-sm font-semibold transition",
                                    link.active
                                        ? "border-primary bg-primary text-white"
                                        : "border-primary/20 bg-white text-primary hover:bg-app",
                                    !link.url ? "cursor-not-allowed opacity-50" : "cursor-pointer",
                                ].join(" ")}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}

                <StudentsCreateModal
                    open={createOpen}
                    onClose={() => setCreateOpen(false)}
                    onCreated={handleCreated}
                />

                <StudentsEditModal
                    open={editOpen}
                    student={selectedStudent}
                    onClose={() => {
                        setEditOpen(false);
                        setSelectedStudent(null);
                    }}
                    onUpdated={handleUpdated}
                />
            </div>
        </AdminLayout>
    );
}