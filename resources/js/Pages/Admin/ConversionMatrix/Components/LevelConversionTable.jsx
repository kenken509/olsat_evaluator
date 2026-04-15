import React from "react";

export default function LevelConversionTable({ rows }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-slate-900 text-white">
                        <th
                            colSpan={4}
                            className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold"
                        >
                            Total
                        </th>
                        <th
                            colSpan={2}
                            className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold"
                        >
                            Verbal
                        </th>
                        <th
                            colSpan={2}
                            className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold"
                        >
                            Nonverbal
                        </th>
                    </tr>

                    <tr className="bg-slate-800 text-white">
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            Raw Score
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            Scaled Score
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            Raw Score
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            Scaled Score
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            Raw Score
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            Scaled Score
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            Raw Score
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            Scaled Score
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={index}
                            className="odd:bg-white even:bg-slate-50 transition-colors hover:bg-amber-50"
                        >
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-900">
                                {row.total_raw_1}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {row.total_scaled_1}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-900">
                                {row.total_raw_2}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {row.total_scaled_2}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-900">
                                {row.verbal_raw}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {row.verbal_scaled}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-900">
                                {row.nonverbal_raw}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {row.nonverbal_scaled}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}