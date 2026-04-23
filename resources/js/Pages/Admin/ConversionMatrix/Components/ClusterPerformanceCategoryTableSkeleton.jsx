import React from "react";

export default function ClusterPerformanceCategoryTableSkeleton({ rows = 7 }) {
    return (
        <div className="overflow-x-auto animate-pulse">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-slate-900 text-white">
                        <th className="border border-slate-700 px-4 py-3 text-left text-sm font-semibold">
                            Subtest / Content Cluster
                        </th>
                        <th className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold">
                            Number of Items
                        </th>
                        <th className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold">
                            Below Average
                        </th>
                        <th className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold">
                            Average
                        </th>
                        <th className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold">
                            Above Average
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex} className="odd:bg-white even:bg-slate-50">
                            {Array.from({ length: 5 }).map((__, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="border border-slate-200 px-4 py-3"
                                >
                                    <div className="mx-auto h-5 w-20 rounded bg-slate-200" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}