import AdminLayout from "../../../Layouts/AdminLayout";
import Pagination from "../../../Components/Pagination";
import PreviewModal from "../Evaluator/Components/PreviewModal";
import axios from "axios";
import { useEffect, useState } from "react";

const THEME = {
    maroon: "#8F1D1D",
    maroonDark: "#6F1414",
    gold: "#D4A62A",
    cream: "#FBF7EE",
    border: "#E5D9C7",
    textSoft: "#6B7280",
};

function Card({ children, className = "" }) {
    return (
        <div
            className={`rounded-[24px] border bg-white shadow-sm ${className}`}
            style={{ borderColor: THEME.border }}
        >
            {children}
        </div>
    );
}

function TableTh({ children }) {
    return (
        <th
            className="whitespace-nowrap border-b bg-[#FBF7EE] px-4 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-700"
            style={{ borderColor: THEME.border }}
        >
            {children}
        </th>
    );
}

function TableTd({ children, className = "" }) {
    return (
        <td
            className={`whitespace-nowrap border-b px-4 py-3 text-sm text-slate-700 ${className}`}
            style={{ borderColor: "#F2E8DA" }}
        >
            {children}
        </td>
    );
}

export default function Index() {
    const [rows, setRows] = useState([]);
    const [meta, setMeta] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 10,
        total: 0,
        from: 0,
        to: 0,
    });

    const [search, setSearch] = useState("");
    const [perPage, setPerPage] = useState(10);
    const [loading, setLoading] = useState(false);

    const [previewOpen, setPreviewOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedEvaluationId, setSelectedEvaluationId] = useState(null);

    const fetchReports = async (page = 1) => {
        try {
            setLoading(true);

            const response = await axios.get("/admin-panel/evaluation-reports/fetch", {
                params: {
                    page,
                    search: search || undefined,
                    per_page: perPage,
                },
            });

            setRows(response.data.data || []);
            setMeta(response.data.meta);
        } catch (error) {
            console.error("Failed to fetch evaluation reports:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchReports(1);
        }, 350);

        return () => clearTimeout(timer);
    }, [search, perPage]);

    useEffect(() => {
        fetchReports(1);
    }, []);

    const openPreview = (row) => {
        setSelectedReport(row.result_payload);
        setSelectedEvaluationId(row.id);
        setPreviewOpen(true);
    };

    return (
        <AdminLayout>
            <div className="mx-auto space-y-5">
                <Card className="p-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <label
                                className="mb-2 block text-xs font-semibold uppercase tracking-wide"
                                style={{ color: THEME.maroon }}
                            >
                                Search
                            </label>
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by student name, record ID, form, or level"
                                className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition"
                                style={{ borderColor: THEME.border }}
                            />
                        </div>

                        <div>
                            <label
                                className="mb-2 block text-xs font-semibold uppercase tracking-wide"
                                style={{ color: THEME.maroon }}
                            >
                                Entries
                            </label>
                            <select
                                value={perPage}
                                onChange={(e) => setPerPage(Number(e.target.value))}
                                className="w-full rounded-2xl border bg-white px-4 py-3 text-sm outline-none transition cursor-pointer"
                                style={{ borderColor: THEME.border }}
                            >
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                            </select>
                        </div>
                    </div>
                </Card>

                <Card className="overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse">
                            <thead>
                                <tr>
                                    <TableTh>ID</TableTh>
                                    <TableTh>Student Name</TableTh>
                                    <TableTh>Grade</TableTh>
                                    <TableTh>Age</TableTh>
                                    <TableTh>Level</TableTh>
                                    <TableTh>Form</TableTh>
                                    <TableTh>Test Date</TableTh>
                                    <TableTh>Saved At</TableTh>
                                    <TableTh>Actions</TableTh>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <TableTd className="py-8 text-center" colSpan={10}>
                                            Loading reports...
                                        </TableTd>
                                    </tr>
                                ) : rows.length === 0 ? (
                                    <tr>
                                        <TableTd className="py-8 text-center" colSpan={10}>
                                            No evaluation reports found.
                                        </TableTd>
                                    </tr>
                                ) : (
                                    rows.map((row) => (
                                        <tr key={row.id}>
                                            <TableTd className="font-semibold text-[#8F1D1D]">
                                                {row.id}
                                            </TableTd>
                                            <TableTd>{row.student_name}</TableTd>
                                            <TableTd>{row.grade}</TableTd>
                                            <TableTd>{row.age}</TableTd>
                                            <TableTd>{row.level}</TableTd>
                                            <TableTd>{row.form}</TableTd>
                                            <TableTd>{row.test_date}</TableTd>                                           
                                            <TableTd>{row.created_at}</TableTd>
                                            <TableTd>
                                                <button
                                                    type="button"
                                                    onClick={() => openPreview(row)}
                                                    className="group relative overflow-hidden rounded-xl border px-3 py-2 text-xs font-semibold transition cursor-pointer"
                                                    style={{
                                                        borderColor: THEME.maroon,
                                                        color: THEME.maroon,
                                                        backgroundColor: "white",
                                                    }}
                                                >
                                                    <span
                                                        className="absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                                                        style={{ backgroundColor: THEME.maroon }}
                                                    />
                                                    <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                                                        Preview
                                                    </span>
                                                </button>
                                            </TableTd>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </Card>

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <p className="text-sm text-slate-500">
                        Showing {meta.from ?? 0} to {meta.to ?? 0} of {meta.total ?? 0} records
                    </p>

                    <Pagination
                        currentPage={meta.current_page}
                        lastPage={meta.last_page}
                        onPageChange={fetchReports}
                        loading={loading}
                    />
                </div>
            </div>

            <PreviewModal
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                data={selectedReport}
                evaluationId={selectedEvaluationId}
                theme={THEME}
            />
        </AdminLayout>
    );
}