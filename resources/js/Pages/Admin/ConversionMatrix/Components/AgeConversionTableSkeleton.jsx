import React from "react";

export default function AgeConversionTableSkeleton({ rows = 5 }) {
    return (
        <div className="overflow-x-auto animate-pulse">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-slate-900 text-white">
                        <th rowSpan={2} className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold">
                            SAI
                        </th>
                        <th colSpan={4} className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold">
                            Total
                        </th>
                        <th colSpan={4} className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold">
                            Verbal
                        </th>
                        <th colSpan={4} className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold">
                            Nonverbal
                        </th>
                    </tr>
                    <tr className="bg-slate-800 text-white">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <th
                                key={i}
                                className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold"
                            >
                                —
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {Array.from({ length: rows }).map((_, rowIndex) => (
                        <tr key={rowIndex} className="odd:bg-white even:bg-slate-50">
                            {Array.from({ length: 13 }).map((__, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className="border border-slate-200 px-3 py-3"
                                >
                                    <div className="mx-auto h-5 w-16 rounded bg-slate-200" />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}