import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import Swal from "sweetalert2";

export default function Index({authUserId}) {
    const [users, setUsers] = useState([]);
    const [meta, setMeta] = useState(null);

    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);

    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [view, setView] = useState("active"); // active | archived

    const debounceRef = useRef(null);
    const abortRef = useRef(null);

    const fetchUsers = async ({
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
            const response = await axios.get("/admin-panel/users-all", {
                params: {
                    page,
                    q: query.trim(),
                    per_page,
                    view: currentView,
                },
                signal: controller.signal,
            });

            setUsers(response.data.data);
            setMeta(response.data);
        } catch (error) {
            if (error?.code !== "ERR_CANCELED") {
                console.error("Failed to fetch users:", error);
            }
        } finally {
            setLoading(false);
            setFetching(false);
        }
    };

    useEffect(() => {
        fetchUsers({
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
            fetchUsers({
                page: 1,
                query: search,
                per_page: perPage,
                currentView: view,
            });
        }, 400);

        return () => clearTimeout(debounceRef.current);
    }, [search]);

    useEffect(() => {
        fetchUsers({
            page: 1,
            query: search,
            per_page: perPage,
            currentView: view,
        });
    }, [view]);

    const handlePerPageChange = (e) => {
        const value = Number(e.target.value);
        setPerPage(value);

        fetchUsers({
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

        fetchUsers({
            page,
            query: search,
            per_page: perPage,
            currentView: view,
        });
    };

    const handleDeleteOrRestore = async (user) => {
        const isArchivedView = view === "archived";
        const isSelf = Number(user.id) === Number(authUserId);

        if (!isArchivedView && isSelf) {
            await Swal.fire({
                icon: "warning",
                title: "Action not allowed",
                text: "You cannot archive your own account.",
                confirmButtonColor: "#7A1C1C",
            });
            return;
        }

        const fullName = `${user.fname} ${user.lname}`;

        const result = await Swal.fire({
            title: isArchivedView ? "Restore user?" : "Archive user?",
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
                await axios.patch(`/admin-panel/users/${user.id}/restore`);
            } else {
                await axios.delete(`/admin-panel/users/${user.id}`);
            }

            await Swal.fire({
                icon: "success",
                title: isArchivedView ? "User restored" : "User archived",
                text: isArchivedView
                    ? `${fullName} has been restored successfully.`
                    : `${fullName} has been archived successfully.`,
                confirmButtonColor: "#7A1C1C",
            });

            const currentPage = meta?.current_page ?? 1;

            fetchUsers({
                page: currentPage,
                query: search,
                per_page: perPage,
                currentView: view,
            });
        } catch (error) {
            console.error(
                isArchivedView ? "Failed to restore user:" : "Failed to archive user:",
                error
            );

            Swal.fire({
                icon: "error",
                title: "Action failed",
                text: isArchivedView
                    ? "Failed to restore user."
                    : "Failed to archive user.",
                confirmButtonColor: "#7A1C1C",
            });

            setFetching(false);
        }
    };
   

    return (
        <AdminLayout>
            <div className="space-y-4">
                <div className="rounded-2xl bg-white shadow-sm">
                    <div className="p-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_160px] md:items-end">
                            <div className="w-full">
                                <label className="mb-1 block text-sm font-semibold text-primary">
                                    Search Users
                                </label>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder={
                                        view === "active"
                                            ? "Search active users by name, email, or role..."
                                            : "Search archived users by name, email, or role..."
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
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold">Last Login</th>
                                    <th className="px-6 py-4 text-center text-sm font-semibold">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-10 text-center text-app">
                                            Loading users...
                                        </td>
                                    </tr>
                                ) : users.length > 0 ? (
                                    users.map((user) =>{ 
                                        const isSelf = Number(user.id) === Number(authUserId);
                                        return    (
                                            
                                                <tr
                                                    key={user.id}
                                                    className="border-b border-primary/10 last:border-b-0 hover:bg-app"
                                                >
                                                    <td className="px-6 py-4 text-sm text-app">
                                                        {user.id}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm font-semibold text-app">
                                                        {user.fname} {user.lname}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-app">
                                                        {user.email}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-white">
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {view === "archived" ? (
                                                            <span className="rounded-full border border-primary px-3 py-1 text-xs font-bold text-primary">
                                                                Archived
                                                            </span>
                                                        ) : user.is_active ? (
                                                            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary">
                                                                Active
                                                            </span>
                                                        ) : (
                                                            <span className="rounded-full border border-primary px-3 py-1 text-xs font-bold text-primary">
                                                                Inactive
                                                            </span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-app">
                                                        {user.last_login_at ?? "Never"}
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <div className="flex items-center justify-center gap-4">
                                                            <button
                                                                type="button"
                                                                className="cursor-pointer"
                                                                title="Edit"
                                                            >
                                                                <FaRegEdit className="text-lg text-green-800" />
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() => handleDeleteOrRestore(user)}
                                                                disabled={view !== "archived" && isSelf}
                                                                title={
                                                                    view === "archived"
                                                                        ? "Restore"
                                                                        : isSelf
                                                                        ? "You cannot archive your own account"
                                                                        : "Archive"
                                                                }
                                                                className={[
                                                                    "cursor-pointer",
                                                                    view !== "archived" && isSelf ? "opacity-50 cursor-not-allowed" : "",
                                                                ].join(" ")}
                                                            >
                                                                <MdOutlineDelete
                                                                    className={[
                                                                        "text-xl",
                                                                        view === "archived"
                                                                            ? "text-green-700"
                                                                            : isSelf
                                                                            ? "text-gray-400"
                                                                            : "text-primary",
                                                                    ].join(" ")}
                                                                />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-10 text-center text-app">
                                            {view === "active"
                                                ? "No active users found."
                                                : "No archived users found."}
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
            </div>
        </AdminLayout>
    );
}