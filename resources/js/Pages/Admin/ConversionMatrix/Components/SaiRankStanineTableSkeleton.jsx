import React from "react";

export default function SaiRankStanineTableSkeleton({ rows = 5 }) {
    return (
        <div className="overflow-x-auto animate-pulse">
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
                    {Array.from({ length: rows }).map((_, index) => (
                        <tr
                            key={index}
                            className="border-b border-slate-200 last:border-b-0"
                        >
                            {Array.from({ length: 3 }).map((__, cellIndex) => (
                                <td key={cellIndex} className="px-5 py-4">
                                    <div className="h-5 w-24 rounded bg-slate-200" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}