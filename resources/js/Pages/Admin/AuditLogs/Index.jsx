import { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../../../Layouts/AdminLayout";

export default function Index() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [moduleFilter, setModuleFilter] = useState("");
    const [actionFilter, setActionFilter] = useState("");
    const [pagination, setPagination] = useState({});
    const [error, setError] = useState("");

    const fetchLogs = async (page = 1) => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get('/admin-panel/audit-logs-data', {
                params: {
                    page,
                    search,
                    module: moduleFilter,
                    action: actionFilter,
                },
            });

            setLogs(response.data.data);
            setPagination({
                current_page: response.data.current_page,
                last_page: response.data.last_page,
                prev_page_url: response.data.prev_page_url,
                next_page_url: response.data.next_page_url,
            });
        } catch (err) {
            console.error(err);
            setError("Failed to load audit logs.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
    }, []);

    const handleFilter = () => {
        fetchLogs(1);
    };

    return (
        <AdminLayout>
            <div className=" space-y-2">
                

                <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                    <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by actor, module, action..."
                            className="w-full md:w-80 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <div className="flex gap-2">
                            <select
                                value={moduleFilter}
                                onChange={(e) => setModuleFilter(e.target.value)}
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            >
                                <option value="">All modules</option>
                                <option value="users">Users</option>
                                <option value="students">Students</option>
                                <option value="settings">Settings</option>
                            </select>

                            <select
                                value={actionFilter}
                                onChange={(e) => setActionFilter(e.target.value)}
                                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            >
                                <option value="">All actions</option>
                                <option value="create">Create</option>
                                <option value="update">Update</option>
                                <option value="delete">Delete</option>
                                <option value="login">Login</option>
                            </select>

                            <button
                                onClick={handleFilter}
                                className="rounded-lg bg-maroon-700 px-4 py-2 text-sm font-medium text-white"
                            >
                                Filter
                            </button>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm">
                            <thead className="bg-gray-50 text-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Actor</th>
                                    <th className="px-4 py-3 text-left font-semibold">Module</th>
                                    <th className="px-4 py-3 text-left font-semibold">Action</th>
                                    <th className="px-4 py-3 text-left font-semibold">Description</th>
                                    <th className="px-4 py-3 text-left font-semibold">IP Address</th>
                                    <th className="px-4 py-3 text-left font-semibold">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-10 text-center text-gray-500">
                                            Loading audit logs...
                                        </td>
                                    </tr>
                                ) : error ? (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-10 text-center text-red-500">
                                            {error}
                                        </td>
                                    </tr>
                                ) : logs.length > 0 ? (
                                    logs.map((log) => (
                                        <tr key={log.id} className="hover:bg-gray-50">
                                            <td className="px-4 py-3">{log.actor?.name ?? "System"}</td>
                                            <td className="px-4 py-3">{log.module}</td>
                                            <td className="px-4 py-3">{log.action}</td>
                                            <td className="px-4 py-3">{log.description}</td>
                                            <td className="px-4 py-3">{log.ip_address ?? "-"}</td>
                                            <td className="px-4 py-3">{log.created_at}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-4 py-10 text-center text-gray-500">
                                            No audit logs found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center justify-between p-4 border-t border-gray-200">
                        <button
                            onClick={() => fetchLogs(pagination.current_page - 1)}
                            disabled={!pagination.prev_page_url || loading}
                            className="rounded border px-4 py-2 text-sm disabled:opacity-50"
                        >
                            Previous
                        </button>

                        <span className="text-sm text-gray-600">
                            Page {pagination.current_page || 1} of {pagination.last_page || 1}
                        </span>

                        <button
                            onClick={() => fetchLogs(pagination.current_page + 1)}
                            disabled={!pagination.next_page_url || loading}
                            className="rounded border px-4 py-2 text-sm disabled:opacity-50"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}