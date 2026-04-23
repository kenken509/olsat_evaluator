import React from "react";

export default function ClusterPerformanceCategoryTable({ rows = [] }) {
    return (
        <div className="overflow-x-auto">
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
                    {rows.map((row, index) => (
                        <tr
                            key={`${row.cluster}-${index}`}
                            className="odd:bg-white even:bg-slate-50 transition-colors hover:bg-amber-50"
                        >
                            <td className="border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-900">
                                {row.cluster_label}
                            </td>
                            <td className="border border-slate-200 px-4 py-3 text-center text-sm text-slate-700">
                                {row.number_of_items}
                            </td>
                            <td className="border border-slate-200 px-4 py-3 text-center text-sm text-slate-700">
                                {row.below_average}
                            </td>
                            <td className="border border-slate-200 px-4 py-3 text-center text-sm text-slate-700">
                                {row.average}
                            </td>
                            <td className="border border-slate-200 px-4 py-3 text-center text-sm text-slate-700">
                                {row.above_average}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}