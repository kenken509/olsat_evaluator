import React from "react";

function renderCell(cell) {
    if (!cell) return "—";
    if (typeof cell === "string") return cell;
    if (cell.label) return cell.label;
    return "—";
}

export default function GradeRankStanineTable({ rows = [] }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-slate-900 text-white">
                        <th className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold">
                            Stanine
                        </th>
                        <th className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold">
                            %ile Rank
                        </th>
                        <th className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold">
                            Total
                        </th>
                        <th className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold">
                            Verbal
                        </th>
                        <th className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold">
                            Nonverbal
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {rows.length > 0 ? (
                        rows.map((row, index) => (
                            <tr
                                key={`${row.stanine}-${row.percentile_rank}-${index}`}
                                className="odd:bg-white even:bg-slate-50 transition-colors hover:bg-amber-50"
                            >
                                <td className="border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-900">
                                    {row.stanine}
                                </td>
                                <td className="border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-900">
                                    {row.percentile_rank}
                                </td>
                                <td className="border border-slate-200 px-4 py-3 text-center text-sm text-slate-700">
                                    {renderCell(row.total)}
                                </td>
                                <td className="border border-slate-200 px-4 py-3 text-center text-sm text-slate-700">
                                    {renderCell(row.verbal)}
                                </td>
                                <td className="border border-slate-200 px-4 py-3 text-center text-sm text-slate-700">
                                    {renderCell(row.nonverbal)}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={5}
                                className="border border-slate-200 px-4 py-8 text-center text-sm text-slate-500"
                            >
                                No grade rank / stanine rows found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}