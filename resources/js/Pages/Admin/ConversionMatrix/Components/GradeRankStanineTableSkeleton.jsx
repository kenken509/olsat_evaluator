import React from "react";

export default function GradeRankStanineTableSkeleton({ rows = 5 }) {
    return (
        <div className="overflow-x-auto animate-pulse">
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