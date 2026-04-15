import React, { useMemo, useState } from "react";
import { Search, Plus, Upload, Download, Filter, ChevronRight, Database, Pencil, Archive } from "lucide-react";
import AdminLayout from "../../../Layouts/AdminLayout";

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

const SAMPLE_ROWS = {
  levels: [
    { band: "1-5", scaled: 31, sai: 82, rank: 12, stanine: 3, verbal: "Low Average" },
    { band: "6-10", scaled: 37, sai: 91, rank: 28, stanine: 4, verbal: "Average" },
    { band: "11-15", scaled: 43, sai: 101, rank: 52, stanine: 5, verbal: "Average" },
    { band: "16-20", scaled: 49, sai: 110, rank: 74, stanine: 6, verbal: "High Average" },
    { band: "21-25", scaled: 55, sai: 120, rank: 91, stanine: 8, verbal: "Superior" },
  ],
  ages: [
    { band: "1-5", scaled: 29, sai: 79, rank: 9, stanine: 2, verbal: "Below Average" },
    { band: "6-10", scaled: 35, sai: 88, rank: 21, stanine: 4, verbal: "Average" },
    { band: "11-15", scaled: 41, sai: 98, rank: 45, stanine: 5, verbal: "Average" },
    { band: "16-20", scaled: 47, sai: 108, rank: 69, stanine: 6, verbal: "High Average" },
    { band: "21-25", scaled: 53, sai: 118, rank: 88, stanine: 8, verbal: "Superior" },
  ],
  gradeRank: [
    { band: "1-5", scaled: 30, sai: 81, rank: 10, stanine: 2, verbal: "Below Average" },
    { band: "6-10", scaled: 36, sai: 90, rank: 25, stanine: 4, verbal: "Average" },
    { band: "11-15", scaled: 42, sai: 100, rank: 50, stanine: 5, verbal: "Average" },
    { band: "16-20", scaled: 48, sai: 109, rank: 72, stanine: 6, verbal: "High Average" },
    { band: "21-25", scaled: 54, sai: 119, rank: 89, stanine: 8, verbal: "Superior" },
  ],
  verbal: [
    { band: "1-5", scaled: 28, sai: 78, rank: 8, stanine: 2, verbal: "Below Average" },
    { band: "6-10", scaled: 34, sai: 87, rank: 20, stanine: 4, verbal: "Average" },
    { band: "11-15", scaled: 40, sai: 97, rank: 43, stanine: 5, verbal: "Average" },
    { band: "16-20", scaled: 46, sai: 106, rank: 67, stanine: 6, verbal: "High Average" },
    { band: "21-25", scaled: 52, sai: 116, rank: 86, stanine: 8, verbal: "Superior" },
  ],
};

function classNames(...values) {
  return values.filter(Boolean).join(" ");
}

export default function ConversionMatrixIndexMockup() {
  const [category, setCategory] = useState("levels");
  const [selectedGroup, setSelectedGroup] = useState(CATEGORY_CONFIG.levels.options[0]);
  const [search, setSearch] = useState("");

  const config = CATEGORY_CONFIG[category];

  const rows = useMemo(() => {
    const source = SAMPLE_ROWS[category] ?? [];
    if (!search.trim()) return source;
    const q = search.toLowerCase();
    return source.filter((row) =>
      Object.values(row).some((value) => String(value).toLowerCase().includes(q))
    );
  }, [category, search]);

  const handleCategoryChange = (next) => {
    setCategory(next);
    setSelectedGroup(CATEGORY_CONFIG[next].options[0]);
    setSearch("");
  };

  return (
    <AdminLayout>
        <div className="min-h-screen bg-slate-100 p-6 text-slate-800">
        <div className="mx-auto max-w-7xl space-y-6">
            <div className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
            {/* <div className="flex flex-col gap-4 border-b border-slate-200 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
                <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                    OLSAT Administration
                </p>
                <h1 className="mt-1 text-2xl font-bold text-slate-900">Conversion Matrix</h1>
                <p className="mt-1 text-sm text-slate-500">
                    Manage score conversion references by category, subgroup, and interpretation.
                </p>
                </div>

                <div className="flex flex-wrap gap-2">
                <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    <Upload className="h-4 w-4" />
                    Import
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
                    <Download className="h-4 w-4" />
                    Export
                </button>
                <button className="inline-flex items-center gap-2 rounded-2xl bg-[#7A1C1C] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90">
                    <Plus className="h-4 w-4" />
                    New Matrix
                </button>
                </div>
            </div> */}

            <div className="grid gap-6 p-6 xl:grid-cols-[1.5fr_360px]">
                <div className="space-y-6">
                <div className="rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200">
                    <div className="grid gap-3 lg:grid-cols-4">
                    {Object.entries(CATEGORY_CONFIG).map(([key, item]) => {
                        const active = category === key;
                        return (
                        <button
                            key={key}
                            type="button"
                            onClick={() => handleCategoryChange(key)}
                            className={classNames(
                            "rounded-2xl border px-4 py-4 text-left transition",
                            active
                                ? "border-[#7A1C1C] bg-[#7A1C1C] text-white shadow-sm"
                                : "border-slate-200 bg-white hover:bg-slate-100"
                            )}
                        >
                            <div className="text-sm font-semibold">{item.label}</div>
                            <div className={classNames(
                            "mt-2 inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold",
                            active ? "border-white/30 bg-white/10 text-white" : item.color
                            )}>
                            {item.options.length} groups
                            </div>
                        </button>
                        );
                    })}
                    </div>
                </div>

                <div className="rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-slate-900">Select subgroup</p>
                        <p className="text-xs text-slate-500">Switch the matrix without leaving the page.</p>
                    </div>
                    <div className="relative w-full max-w-md">
                        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                        <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search raw score, SAI, stanine, or interpretation..."
                        className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none ring-0 transition focus:border-[#7A1C1C] focus:bg-white"
                        />
                    </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                    {config.options.map((option) => (
                        <button
                        key={option}
                        type="button"
                        onClick={() => setSelectedGroup(option)}
                        className={classNames(
                            "rounded-full border px-4 py-2 text-sm font-semibold transition",
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

                <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200">
                    <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                        <span className={classNames("inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold", config.color)}>
                            {config.label}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                        <span className="text-sm font-semibold text-slate-900">{selectedGroup}</span>
                        </div>
                        <p className="mt-1 text-sm text-slate-500">
                        Raw score conversion matrix for the selected norm group.
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

                    <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead className="bg-slate-900 text-white">
                        <tr>
                            <th className="px-5 py-4 text-left text-sm font-semibold">Raw Score Band</th>
                            <th className="px-5 py-4 text-left text-sm font-semibold">Scaled Score</th>
                            <th className="px-5 py-4 text-left text-sm font-semibold">SAI</th>
                            <th className="px-5 py-4 text-left text-sm font-semibold">Percentile Rank</th>
                            <th className="px-5 py-4 text-left text-sm font-semibold">Stanine</th>
                            <th className="px-5 py-4 text-left text-sm font-semibold">Interpretation</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rows.map((row, index) => (
                            <tr key={`${row.band}-${index}`} className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
                            <td className="px-5 py-4 text-sm font-semibold text-slate-900">{row.band}</td>
                            <td className="px-5 py-4 text-sm text-slate-700">{row.scaled}</td>
                            <td className="px-5 py-4 text-sm text-slate-700">{row.sai}</td>
                            <td className="px-5 py-4 text-sm text-slate-700">{row.rank}%</td>
                            <td className="px-5 py-4 text-sm text-slate-700">{row.stanine}</td>
                            <td className="px-5 py-4 text-sm text-slate-700">{row.verbal}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>

                    <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 text-sm text-slate-500">
                    <span>Showing {rows.length} conversion bands</span>
                    <span>Source: Spring Multilevel Norms</span>
                    </div>
                </div>
                </div>

                <div className="space-y-4">
                <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                    <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-[#7A1C1C]" />
                    <h2 className="text-base font-bold text-slate-900">Matrix Summary</h2>
                    </div>
                    <div className="mt-4 space-y-3 text-sm">
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="text-slate-500">Category</span>
                        <span className="font-semibold text-slate-900">{config.label}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="text-slate-500">Selected Group</span>
                        <span className="font-semibold text-slate-900">{selectedGroup}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="text-slate-500">Conversion Rows</span>
                        <span className="font-semibold text-slate-900">{rows.length}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                        <span className="text-slate-500">Version</span>
                        <span className="font-semibold text-slate-900">2025 Norms</span>
                    </div>
                    </div>
                </div>

                <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
                    <h2 className="text-base font-bold text-slate-900">Quick Actions</h2>
                    <div className="mt-4 space-y-3">
                    <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                        Duplicate selected matrix
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                    </button>
                    <button className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                        Update conversion bands
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                    </button>
                    <button className="flex w-full items-center justify-between rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-left text-sm font-semibold text-rose-700 hover:bg-rose-100">
                        Archive matrix group
                        <Archive className="h-4 w-4" />
                    </button>
                    </div>
                </div>

                <div className="rounded-3xl bg-[#7A1C1C] p-5 text-white shadow-sm">
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-white/70">Design Note</p>
                    <h2 className="mt-2 text-lg font-bold">Why this layout works</h2>
                    <p className="mt-2 text-sm leading-6 text-white/85">
                    It keeps all norm types on one page, but avoids a giant unreadable sheet by using category switches, subgroup chips, and one reusable matrix table.
                    </p>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </AdminLayout>
  );
}
