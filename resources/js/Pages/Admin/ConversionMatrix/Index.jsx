import React, { useMemo, useState } from "react";
import {
    Search,
    Filter,
    Pencil,
    ChevronDown,
    ChevronUp,
} from "lucide-react";
import AdminLayout from "../../../Layouts/AdminLayout";
import LevelConversionTable from "./Components/LevelConversionTable";
import StandardTable from "./Components/StandardTable";

const CATEGORY_CONFIG = {
    levels: {
        label: "Levels",
        color: "bg-violet-100 text-violet-700 border-violet-200",
        options: ["Level E", "Level F", "Level G"],
    },
    ages: {
        label: "Age",
        color: "bg-sky-100 text-sky-700 border-sky-200",
        options: ["8 y/o", "9 y/o", "10 y/o", "11 y/o", "12 y/o", "13 y/o", "14 y/o", "15 y/o", "16 y/o", "17 y/o", "18 y/o"],
    },
    gradeRank: {
        label: "Grade Rank / Stanine",
        color: "bg-amber-100 text-amber-800 border-amber-200",
        options: ["Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Grade 11", "Grade 12"],
    },
    verbal: {
        label: "Verbal Interpretation",
        color: "bg-emerald-100 text-emerald-700 border-emerald-200",
        options: ["Grade 4-7", "Grade 8-10", "Grade 11-12"],
    },
};

const LEVEL_ROWS = [
    {
        total_raw_1: 64,
        total_scaled_1: 752,
        total_raw_2: 32,
        total_scaled_2: 571,
        verbal_raw: 32,
        verbal_scaled: 720,
        nonverbal_raw: 32,
        nonverbal_scaled: 734,
    },
    {
        total_raw_1: 63,
        total_scaled_1: 729,
        total_raw_2: 31,
        total_scaled_2: 569,
        verbal_raw: 31,
        verbal_scaled: 697,
        nonverbal_raw: 31,
        nonverbal_scaled: 710,
    },
    {
        total_raw_1: 62,
        total_scaled_1: 704,
        total_raw_2: 30,
        total_scaled_2: 566,
        verbal_raw: 30,
        verbal_scaled: 670,
        nonverbal_raw: 30,
        nonverbal_scaled: 684,
    },
    {
        total_raw_1: 61,
        total_scaled_1: 689,
        total_raw_2: 29,
        total_scaled_2: 564,
        verbal_raw: 29,
        verbal_scaled: 654,
        nonverbal_raw: 29,
        nonverbal_scaled: 668,
    },
];

const STANDARD_ROWS = {
    ages: [
        { band: "1-5", scaled: 29, sai: 79, rank: 9, stanine: 2, verbal: "Below Average" },
        { band: "6-10", scaled: 35, sai: 88, rank: 21, stanine: 4, verbal: "Average" },
        { band: "11-15", scaled: 41, sai: 98, rank: 45, stanine: 5, verbal: "Average" },
        { band: "16-20", scaled: 47, sai: 108, rank: 69, stanine: 6, verbal: "High Average" },
    ],
    gradeRank: [
        { band: "1-5", scaled: 30, sai: 81, rank: 10, stanine: 2, verbal: "Below Average" },
        { band: "6-10", scaled: 36, sai: 90, rank: 25, stanine: 4, verbal: "Average" },
        { band: "11-15", scaled: 42, sai: 100, rank: 50, stanine: 5, verbal: "Average" },
        { band: "16-20", scaled: 48, sai: 109, rank: 72, stanine: 6, verbal: "High Average" },
    ],
    verbal: [
        { band: "1-5", scaled: 28, sai: 78, rank: 8, stanine: 2, verbal: "Below Average" },
        { band: "6-10", scaled: 34, sai: 87, rank: 20, stanine: 4, verbal: "Average" },
        { band: "11-15", scaled: 40, sai: 97, rank: 43, stanine: 5, verbal: "Average" },
        { band: "16-20", scaled: 46, sai: 106, rank: 67, stanine: 6, verbal: "High Average" },
    ],
};

function classNames(...values) {
    return values.filter(Boolean).join(" ");
}

export default function ConversionMatrixIndexMockup() {
    const [category, setCategory] = useState("levels");
    const [selectedGroup, setSelectedGroup] = useState(
        CATEGORY_CONFIG.levels.options[0]
    );
    const [search, setSearch] = useState("");
    const [controlsOpen, setControlsOpen] = useState(true);

    const config = CATEGORY_CONFIG[category];

    const rows = useMemo(() => {
        const source =
            category === "levels"
                ? LEVEL_ROWS
                : STANDARD_ROWS[category] ?? [];

        if (!search.trim()) return source;

        const q = search.toLowerCase();
        return source.filter((row) =>
            Object.values(row).some((value) =>
                String(value).toLowerCase().includes(q)
            )
        );
    }, [category, search]);

    const handleCategoryChange = (next) => {
        setCategory(next);
        setSelectedGroup(CATEGORY_CONFIG[next].options[0]);
        setSearch("");
    };

    return (
        <AdminLayout>
            <div className="space-y-4">
                <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
                    <button
                        type="button"
                        onClick={() => setControlsOpen((prev) => !prev)}
                        className="flex w-full items-center justify-between px-5 py-4 text-left"
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className={classNames(
                                    "inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
                                    config.color
                                )}
                            >
                                {config.label}
                            </span>
                            <span className="text-lg text-slate-400">›</span>
                            <span className="text-sm font-semibold text-slate-900">
                                {selectedGroup}
                            </span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="text-sm font-medium text-slate-500">
                                {controlsOpen ? "Hide" : "Show"}
                            </span>
                            <span className="rounded-full border border-slate-200 p-2 text-slate-500">
                                {controlsOpen ? (
                                    <ChevronUp className="h-4 w-4" />
                                ) : (
                                    <ChevronDown className="h-4 w-4" />
                                )}
                            </span>
                        </div>
                    </button>

                    {controlsOpen && (
                        <div className="border-t border-slate-200 bg-slate-50 p-3">
                            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                                {Object.entries(CATEGORY_CONFIG).map(([key, item]) => {
                                    const active = category === key;

                                    return (
                                        <button
                                            key={key}
                                            type="button"
                                            onClick={() => handleCategoryChange(key)}
                                            className={classNames(
                                                "rounded-2xl border px-4 py-4 text-left transition-all duration-200 ease-out",
                                                "hover:-translate-y-1 hover:scale-[1.01] hover:shadow-md",
                                                "active:scale-[0.99]",
                                                active
                                                    ? "border-[#7A1C1C] bg-[#7A1C1C] text-white shadow-sm"
                                                    : "border-slate-200 bg-white hover:bg-slate-100"
                                            )}
                                        >
                                            <div className="text-sm font-semibold leading-tight">
                                                {item.label}
                                            </div>
                                            <div
                                                className={classNames(
                                                    "mt-2 inline-flex rounded-full border px-2 py-1 text-[11px] font-semibold",
                                                    active
                                                        ? "border-white/30 bg-white/10 text-white"
                                                        : item.color
                                                )}
                                            >
                                                {item.options.length} groups
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                                <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                                    <div className="flex-1">
                                        <p className="text-sm font-semibold text-slate-900">
                                            Select subgroup
                                        </p>

                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {config.options.map((option) => (
                                                <button
                                                    key={option}
                                                    type="button"
                                                    onClick={() => setSelectedGroup(option)}
                                                    className={classNames(
                                                        "rounded-full border px-3 py-1.5 text-sm font-semibold transition",
                                                        selectedGroup === option
                                                            ? "border-[#7A1C1C] bg-[#7A1C1C] text-white"
                                                            : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                                                    )}
                                                >
                                                    {option}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="w-full xl:ml-4 xl:max-w-sm">
                                        <div className="relative">
                                            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                                            <input
                                                value={search}
                                                onChange={(e) => setSearch(e.target.value)}
                                                placeholder="Search matrix rows..."
                                                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#7A1C1C] focus:bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h2 className="text-base font-bold text-slate-900">
                                Conversion Rows
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Review and manage the conversion bands for the selected matrix.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                                <Filter className="h-4 w-4" />
                                Filters
                            </button>

                            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                                <Pencil className="h-4 w-4" />
                                Edit Matrix
                            </button>
                        </div>
                    </div>

                    {category === "levels" ? (
                        <LevelConversionTable rows={rows} />
                    ) : (
                        <StandardTable rows={rows} />
                    )}

                    <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 text-sm text-slate-500">
                        <span>Showing {rows.length} conversion rows</span>
                        <span>Source: Spring Multilevel Norms</span>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}