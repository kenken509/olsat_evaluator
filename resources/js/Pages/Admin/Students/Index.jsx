import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Index() {
    const [users, setUsers] = useState([]);
    const [meta, setMeta] = useState(null);

    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);

    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);

    const debounceRef = useRef(null);
    const abortRef = useRef(null);

    const fetchUsers = async ({
        page = 1,
        query = search,
        per_page = perPage,
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
                    q: query,
                    per_page,
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
        fetchUsers({ page: 1, query: "", per_page: 10, showLoading: true });

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            if (abortRef.current) abortRef.current.abort();
        };
    }, []);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            fetchUsers({ page: 1, query: search, per_page: perPage });
        }, 400);

        return () => clearTimeout(debounceRef.current);
    }, [search]);

    const handlePerPageChange = (e) => {
        const value = Number(e.target.value);
        setPerPage(value);
        fetchUsers({ page: 1, query: search, per_page: value });
    };

    const goToPage = (url) => {
        if (!url) return;

        const parsedUrl = new URL(url);
        const page = parsedUrl.searchParams.get("page") || 1;

        fetchUsers({
            page,
            query: search,
            per_page: perPage,
        });
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
             

                <div className="rounded-2xl bg-white p-4 shadow-sm">
                    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                        <div className="w-full md:max-w-md">
                            <label className="mb-1 block text-sm font-semibold text-primary">
                                Search Users
                            </label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name, email, or role..."
                                className="w-full rounded-xl border border-primary/20 bg-app px-4 py-2 text-app outline-none focus:ring-2 focus:ring-accent"
                            />
                            <div className="mt-1 h-5 text-xs text-gray-400">
                                {fetching ? "Updating results..." : ""}
                            </div>
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-primary">
                                Show Entries
                            </label>
                            <select
                                value={perPage}
                                onChange={handlePerPageChange}
                                className="w-full rounded-xl border border-primary/20 bg-white px-4 py-2 text-app outline-none focus:ring-2 focus:ring-accent md:w-32"
                            >
                                <option value={10}>10</option>
                                <option value={20}>20</option>
                                <option value={30}>30</option>
                                <option value={50}>50</option>
                            </select>
                        </div>
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
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-app">
                                            Loading users...
                                        </td>
                                    </tr>
                                ) : users.length > 0 ? (
                                    users.map((user) => (
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
                                                {user.is_active ? (
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
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-10 text-center text-app">
                                            No users found.
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
                                    "rounded-xl px-4 py-2 text-sm font-semibold transition",
                                    link.active
                                        ? "bg-primary text-white"
                                        : "bg-white text-primary border border-primary/20 hover:bg-app",
                                    !link.url ? "cursor-not-allowed opacity-50" : "",
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