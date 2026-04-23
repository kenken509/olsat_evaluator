import React from "react";

function formatSaiLabel(row) {
    if (row?.label) return row.label;
    if (Number(row?.sai) === 58) return "58 and below";
    return row?.sai ?? "—";
}

export default function SaiRankStanineTable({ rows = [] }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-slate-900 text-white">
                    <tr>
                        <th className="px-5 py-4 text-left text-sm font-semibold">
                            SAI
                        </th>
                        <th className="px-5 py-4 text-left text-sm font-semibold">
                            Percentile Rank
                        </th>
                        <th className="px-5 py-4 text-left text-sm font-semibold">
                            Stanine
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {rows.length > 0 ? (
                        rows.map((row, index) => (
                            <tr
                                key={`${row.sai}-${index}`}
                                className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50"
                            >
                                <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                                    {formatSaiLabel(row)}
                                </td>
                                <td className="px-5 py-4 text-sm text-slate-700">
                                    {row.percentile_rank}%
                                </td>
                                <td className="px-5 py-4 text-sm text-slate-700">
                                    {row.stanine}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={3}
                                className="px-5 py-8 text-center text-sm text-slate-500"
                            >
                                No SAI rank / stanine rows found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}