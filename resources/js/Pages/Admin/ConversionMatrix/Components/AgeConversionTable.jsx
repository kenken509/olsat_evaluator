import React from "react";

function renderRange(cell) {
    if (!cell) return "—";
    if (typeof cell === "string") return cell;
    if (cell.label) return cell.label;
    if (cell.min_value != null && cell.max_value != null) {
        return `${cell.min_value} - ${cell.max_value}`;
    }
    return "—";
}

export default function AgeConversionTable({ rows = [] }) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
                <thead>
                    <tr className="bg-slate-900 text-white">
                        <th
                            rowSpan={2}
                            className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold"
                        >
                            SAI
                        </th>

                        <th
                            colSpan={4}
                            className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold"
                        >
                            Total
                        </th>

                        <th
                            colSpan={4}
                            className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold"
                        >
                            Verbal
                        </th>

                        <th
                            colSpan={4}
                            className="border border-slate-700 px-4 py-3 text-center text-sm font-semibold"
                        >
                            Nonverbal
                        </th>
                    </tr>

                    <tr className="bg-slate-800 text-white">
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            0-2
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            3-5
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            6-8
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            9-11
                        </th>

                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            0-2
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            3-5
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            6-8
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            9-11
                        </th>

                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            0-2
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            3-5
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            6-8
                        </th>
                        <th className="border border-slate-700 px-3 py-3 text-center text-xs font-semibold">
                            9-11
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={`${row.sai}-${index}`}
                            className="odd:bg-white even:bg-slate-50 transition-colors hover:bg-amber-50"
                        >
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm font-semibold text-slate-900">
                                {row.sai}
                            </td>

                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {renderRange(row.total_0_2)}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {renderRange(row.total_3_5)}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {renderRange(row.total_6_8)}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {renderRange(row.total_9_11)}
                            </td>

                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {renderRange(row.verbal_0_2)}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {renderRange(row.verbal_3_5)}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {renderRange(row.verbal_6_8)}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {renderRange(row.verbal_9_11)}
                            </td>

                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {renderRange(row.nonverbal_0_2)}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {renderRange(row.nonverbal_3_5)}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {renderRange(row.nonverbal_6_8)}
                            </td>
                            <td className="border border-slate-200 px-3 py-2 text-center text-sm text-slate-700">
                                {renderRange(row.nonverbal_9_11)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}