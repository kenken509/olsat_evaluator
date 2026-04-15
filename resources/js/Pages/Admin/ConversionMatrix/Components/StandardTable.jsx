import React from "react";

export default function StandardTable({ rows }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full">
                <thead className="bg-slate-900 text-white">
                    <tr>
                        <th className="px-5 py-4 text-left text-sm font-semibold">
                            Raw Score Band
                        </th>
                        <th className="px-5 py-4 text-left text-sm font-semibold">
                            Scaled Score
                        </th>
                        <th className="px-5 py-4 text-left text-sm font-semibold">
                            SAI
                        </th>
                        <th className="px-5 py-4 text-left text-sm font-semibold">
                            Percentile Rank
                        </th>
                        <th className="px-5 py-4 text-left text-sm font-semibold">
                            Stanine
                        </th>
                        <th className="px-5 py-4 text-left text-sm font-semibold">
                            Interpretation
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={`${row.band}-${index}`}
                            className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50"
                        >
                            <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                                {row.band}
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-700">
                                {row.scaled}
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-700">
                                {row.sai}
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-700">
                                {row.rank}%
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-700">
                                {row.stanine}
                            </td>
                            <td className="px-5 py-4 text-sm text-slate-700">
                                {row.verbal}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}