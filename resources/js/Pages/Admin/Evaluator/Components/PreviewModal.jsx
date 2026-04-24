function InfoBox({ label, value, compact = false }) {
    return (
        <div
            className={`rounded-xl border border-[#D9D0C2] bg-white ${
                compact ? "px-3 py-2" : "px-3 py-2.5"
            }`}
        >
            <p className="text-[9px] font-semibold uppercase tracking-[0.08em] text-slate-500">
                {label}
            </p>
            <p className="mt-1 text-[13px] font-semibold leading-tight text-slate-800">
                {value ?? "—"}
            </p>
        </div>
    );
}

function TableCell({ children, className = "", align = "center", strong = false }) {
    return (
        <td
            className={`border border-[#D9D0C2] px-2 py-1.5 text-[11px] ${
                align === "left" ? "text-left" : "text-center"
            } ${strong ? "font-bold text-[#8F1D1D]" : "text-slate-700"} ${className}`}
        >
            {children}
        </td>
    );
}

function TableHeader({ children, align = "center", className = "" }) {
    return (
        <th
            className={`border border-[#D9D0C2] bg-[#FBF7EE] px-2 py-2 text-[11px] font-bold ${
                align === "left" ? "text-left" : "text-center"
            } text-slate-700 ${className}`}
        >
            {children}
        </th>
    );
}

function clusterValue(item, key) {
    if (!item) return "";
    if (key === "number_right") return item.number_right ?? "";
    return item[key] ?? "";
}

export default function PreviewModal({
    open,
    onClose,
    data,
    evaluationId,
    theme,
}) {
    if (!open || !data) return null;

    const clusterRows = [
        ["Total", data.cluster_analysis?.total],
        ["Verbal", data.cluster_analysis?.verbal],
        ["Verbal Comprehension", data.cluster_analysis?.verbal_comprehension],
        ["Verbal Reasoning", data.cluster_analysis?.verbal_reasoning],
        ["Nonverbal", data.cluster_analysis?.nonverbal],
        ["Figural Reasoning", data.cluster_analysis?.figural_reasoning],
        ["Quantitative Reasoning", data.cluster_analysis?.quantitative_reasoning],
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 backdrop-blur-[2px]">
            <div className="h-[94vh] w-[min(1280px,98vw)] rounded-[30px] bg-[#FFFDFC] shadow-2xl overflow-hidden flex flex-col">
                <div
                    className="flex items-center justify-between px-5 py-4 text-white"
                    style={{
                        background: `linear-gradient(90deg, ${theme.maroon}, ${theme.maroonDark})`,
                    }}
                >
                    <div>
                        <h2 className="text-2xl font-bold">OLSAT Result Preview</h2>
                        <p className="mt-1 text-sm text-white/80">
                            Cavite Institute · Saved Evaluation
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-2xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold transition hover:bg-white/20 cursor-pointer"
                    >
                        Close Preview
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto bg-[#F7F4EE] p-4">
                    <div className="min-h-full rounded-[26px] border border-[#E5D9C7] bg-white p-4 shadow-sm">
                        {/* TOP DETAILS */}
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-9 xl:col-span-9">
                                <div className="rounded-[22px] border border-[#E5D9C7] bg-[#FFFDFC] p-4">
                                    <div className="mb-3 flex items-center justify-between">
                                        <h3 className="text-[15px] font-bold text-[#8F1D1D]">
                                            Student Information
                                        </h3>

                                        <span className="rounded-full bg-[#FBF7EE] px-3 py-1 text-[11px] font-semibold text-[#8F1D1D]">
                                            Record ID: {evaluationId || "—"}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                                        <InfoBox label="Student" value={data.student?.student_name} />
                                        <InfoBox label="Student ID" value={data.student?.student_id} />
                                        <InfoBox label="Grade" value={data.student?.grade} />
                                        <InfoBox
                                            label="Age"
                                            value={`${data.student?.age_years ?? "—"}y / ${data.student?.age_months ?? "—"}m`}
                                        />
                                        <InfoBox label="Form" value={data.student?.form} compact />
                                        <InfoBox label="Level" value={data.student?.level} compact />
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-3 xl:col-span-3">
                                <div
                                    className="flex h-full flex-col items-center justify-center rounded-[22px] border p-4 text-center"
                                    style={{
                                        borderColor: theme.gold,
                                        backgroundColor: theme.cream,
                                    }}
                                >
                                    <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#8F1D1D]">
                                        Age (Years / Months)
                                    </p>

                                    <div className="mt-4 flex items-end justify-center gap-5">
                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-[#8F1D1D]">
                                                {data.student?.age_years ?? "--"}
                                            </div>
                                            <div className="mt-1 text-[10px] text-slate-500">Years</div>
                                        </div>

                                        <div className="pb-2 text-4xl font-bold text-[#D4A62A]">/</div>

                                        <div className="text-center">
                                            <div className="text-5xl font-bold text-[#8F1D1D]">
                                                {data.student?.age_months ?? "--"}
                                            </div>
                                            <div className="mt-1 text-[10px] text-slate-500">Months</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SCORE RECORD */}
                        <div className="rounded-[22px] border border-[#E5D9C7] bg-[#FFFDFC] p-4 my-4">
                            <h3 className="mb-3 text-[15px] font-bold text-[#8F1D1D]">
                                Score Record
                            </h3>

                            <div className="overflow-hidden rounded-2xl border border-[#D9D0C2]">
                                <table className="w-full table-fixed border-collapse">
                                    <thead>
                                        <tr>
                                            <TableHeader align="left">Scores</TableHeader>
                                            <TableHeader>Total</TableHeader>
                                            <TableHeader>Verbal</TableHeader>
                                            <TableHeader>Nonverbal</TableHeader>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <TableCell align="left" strong>Raw Score</TableCell>
                                            <TableCell strong>{data.raw_scores?.total}</TableCell>
                                            <TableCell strong>{data.raw_scores?.verbal}</TableCell>
                                            <TableCell strong>{data.raw_scores?.nonverbal}</TableCell>
                                        </tr>
                                        <tr>
                                            <TableCell align="left" strong>Scaled Score</TableCell>
                                            <TableCell>{data.scaled_scores?.total}</TableCell>
                                            <TableCell>{data.scaled_scores?.verbal}</TableCell>
                                            <TableCell>{data.scaled_scores?.nonverbal}</TableCell>
                                        </tr>

                                        <tr>
                                            <td
                                                colspan="4"
                                                align="left"
                                                className="bg-[#FBF7EE] font-bold text-[#8F1D1D] p-2 "
                                            >
                                                Performance by Age:
                                            </td>
                                        </tr>
                                        <tr>
                                            <TableCell align="left" strong>School Ability Index</TableCell>
                                            <TableCell>{data.performance_by_age?.sai?.total}</TableCell>
                                            <TableCell>{data.performance_by_age?.sai?.verbal}</TableCell>
                                            <TableCell>{data.performance_by_age?.sai?.nonverbal}</TableCell>
                                        </tr>
                                        <tr>
                                            <TableCell align="left" strong>Percentile Rank</TableCell>
                                            <TableCell>{data.performance_by_age?.percentile_rank?.total}</TableCell>
                                            <TableCell>{data.performance_by_age?.percentile_rank?.verbal}</TableCell>
                                            <TableCell>{data.performance_by_age?.percentile_rank?.nonverbal}</TableCell>
                                        </tr>
                                        <tr>
                                            <TableCell align="left" strong>Stanine</TableCell>
                                            <TableCell>{data.performance_by_age?.stanine?.total}</TableCell>
                                            <TableCell>{data.performance_by_age?.stanine?.verbal}</TableCell>
                                            <TableCell>{data.performance_by_age?.stanine?.nonverbal}</TableCell>
                                        </tr>

                                        <tr>
                                            <td
                                                colSpan={4}
                                                align="left"
                                                className="bg-[#FBF7EE] font-bold text-[#8F1D1D] p-2 "
                                            >
                                                Performance by Grade
                                            </td>
                                        </tr>
                                        <tr>
                                            <TableCell align="left" strong>Percentile Rank</TableCell>
                                            <TableCell>{data.performance_by_grade?.percentile_rank?.total}</TableCell>
                                            <TableCell>{data.performance_by_grade?.percentile_rank?.verbal}</TableCell>
                                            <TableCell>{data.performance_by_grade?.percentile_rank?.nonverbal}</TableCell>
                                        </tr>
                                        <tr>
                                            <TableCell align="left" strong>Stanine</TableCell>
                                            <TableCell>{data.performance_by_grade?.stanine?.total}</TableCell>
                                            <TableCell>{data.performance_by_grade?.stanine?.verbal}</TableCell>
                                            <TableCell>{data.performance_by_grade?.stanine?.nonverbal}</TableCell>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                        
                        </div>

                        {/* CLUSTER ANALYSIS + SUBTEST */}
                        <div className="grid min-h-0 grid-cols-12 gap-4">
                            <div className="col-span-12 xl:col-span-9">
                                <div className="h-full rounded-[22px] border border-[#E5D9C7] bg-[#FFFDFC] p-4">
                                    <h3 className="mb-3 text-[15px] font-bold text-[#8F1D1D]">
                                        Cluster Analysis
                                    </h3>

                                    <div className="overflow-hidden rounded-2xl border border-[#D9D0C2]">
                                        <table className="w-full table-fixed border-collapse">
                                            <thead>
                                                <tr>
                                                    <TableHeader align="left">Cluster Analysis</TableHeader>
                                                    <TableHeader>Number Right</TableHeader>
                                                    <TableHeader>Below Average</TableHeader>
                                                    <TableHeader>Average</TableHeader>
                                                    <TableHeader>Above Average</TableHeader>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {clusterRows.map(([label, item]) => {
                                                    const isParent = label === "Verbal" || label === "Nonverbal";
                                                    const isChild =
                                                        label === "Verbal Comprehension" ||
                                                        label === "Verbal Reasoning" ||
                                                        label === "Figural Reasoning" ||
                                                        label === "Quantitative Reasoning";

                                                    const isTotal = label === "Total";

                                                    return (
                                                        <tr
                                                            key={label}
                                                            className={
                                                                isParent
                                                                    ? "bg-[#FBF7EE]"
                                                                    : isTotal
                                                                    ? "bg-[#FFFDFC]"
                                                                    : "bg-white"
                                                            }
                                                        >
                                                            <TableCell
                                                                align="left"
                                                                strong={isParent || isTotal}
                                                                className={`
                                                                    ${isParent ? "text-[#8F1D1D] font-bold" : ""}
                                                                    ${isTotal ? "text-[#8F1D1D] font-bold" : ""}
                                                                    ${isChild ? "pl-8 italic text-slate-700" : ""}
                                                                `}
                                                            >
                                                                {isChild ? `↳ ${label}` : label}
                                                            </TableCell>

                                                            <TableCell className={isParent ? "font-bold text-[#8F1D1D]" : ""}>
                                                                {clusterValue(item, "number_of_items")}
                                                            </TableCell>

                                                            <TableCell className={isParent ? "font-bold text-[#8F1D1D]" : ""}>
                                                                {clusterValue(item, "below_average")}
                                                            </TableCell>

                                                            <TableCell className={isParent ? "font-bold text-[#8F1D1D]" : ""}>
                                                                {clusterValue(item, "average")}
                                                            </TableCell>

                                                            <TableCell className={isParent ? "font-bold text-[#8F1D1D]" : ""}>
                                                                {clusterValue(item, "above_average")}
                                                            </TableCell>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                  
                                </div>
                            </div>

                            <div className="col-span-12 xl:col-span-3">
                                <div className="h-full rounded-[22px] border border-[#E5D9C7] bg-[#FFFDFC] p-4">
                                    <h3 className="mb-3 text-[15px] font-bold text-[#8F1D1D]">
                                        Subtest Breakdown
                                    </h3>

                                    <div className="grid grid-cols-1 gap-3">
                                        <InfoBox
                                            label="Verbal Comprehension"
                                            value={data.raw_scores?.verbal_comprehension}
                                        />
                                        <InfoBox
                                            label="Verbal Reasoning"
                                            value={data.raw_scores?.verbal_reasoning}
                                        />
                                        <InfoBox
                                            label="Figural Reasoning"
                                            value={data.raw_scores?.figural_reasoning}
                                        />
                                        <InfoBox
                                            label="Quantitative Reasoning"
                                            value={data.raw_scores?.quantitative_reasoning}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}