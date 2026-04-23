import AdminLayout from "../../../Layouts/AdminLayout";
import axios from "axios";
import { useEffect, useMemo, useRef, useState } from "react";

const THEME = {
    maroon: "#8F1D1D",
    maroonDark: "#6F1414",
    gold: "#D4A62A",
    cream: "#FBF7EE",
    border: "#E5D9C7",
    textSoft: "#6B7280",
};

const initialForm = {
    student_id: "",
    test_date: new Date().toISOString().slice(0, 10),
    form: "5",
    level: "F",
    total: "",
    verbal: "",
    nonverbal: "",
};

function calculateAgeBreakdown(birthdate, testDate) {
    if (!birthdate || !testDate) {
        return { years: "", months: "" };
    }

    const birth = new Date(birthdate);
    const test = new Date(testDate);

    if (Number.isNaN(birth.getTime()) || Number.isNaN(test.getTime()) || test < birth) {
        return { years: "", months: "" };
    }

    let years = test.getFullYear() - birth.getFullYear();
    let months = test.getMonth() - birth.getMonth();
    const days = test.getDate() - birth.getDate();

    if (days < 0) months -= 1;
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    return { years, months };
}

function formatDisplayDate(value) {
    if (!value) return "—";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
}

function Card({ children, className = "" }) {
    return (
        <div
            className={`rounded-[24px] border  shadow-sm ${className}`}
            style={{ borderColor: THEME.border }}
        >
            {children}
        </div>
    );
}

function SectionTitle({ title, subtitle }) {
    return (
        <div className="mb-5">
            <h2 className="text-[18px] font-bold" style={{ color: THEME.maroon }}>
                {title}
            </h2>
            {subtitle && (
                <p className="mt-1 text-sm" style={{ color: THEME.textSoft }}>
                    {subtitle}
                </p>
            )}
        </div>
    );
}

function Label({ children }) {
    return (
        <label
            className="mb-2 block text-[13px] font-semibold uppercase tracking-wide"
            style={{ color: THEME.maroon }}
        >
            {children}
        </label>
    );
}

function Input({ error, className = "", ...props }) {
    return (
        <input
            {...props}
            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${className}`}
            style={{
                borderColor: error ? "#DC2626" : "#D7DCE3",
                backgroundColor: "#FFFFFF",
            }}
        />
    );
}

function Select({ error, children, className = "", ...props }) {
    return (
        <select
            {...props}
            className={`w-full rounded-2xl border px-4 py-3 text-sm outline-none transition ${className}`}
            style={{
                borderColor: error ? "#DC2626" : "#D7DCE3",
                backgroundColor: "#FFFFFF",
            }}
        >
            {children}
        </select>
    );
}

export default function Index() {
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [studentQuery, setStudentQuery] = useState("");
    const [studentResults, setStudentResults] = useState([]);
    const [studentLoading, setStudentLoading] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const searchBoxRef = useRef(null);

    const age = useMemo(() => {
        return calculateAgeBreakdown(selectedStudent?.birthdate, form.test_date);
    }, [selectedStudent, form.test_date]);

    useEffect(() => {
        const handler = setTimeout(async () => {
            if (!studentQuery.trim()) {
                setStudentResults([]);
                return;
            }

            try {
                setStudentLoading(true);
                const response = await axios.get("/evaluator/students/search", {
                    params: { q: studentQuery },
                });
                setStudentResults(response.data);
            } catch (error) {
                console.error("Student search failed:", error);
            } finally {
                setStudentLoading(false);
            }
        }, 300);

        return () => clearTimeout(handler);
    }, [studentQuery]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
                setStudentResults([]);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: null, lookup: null }));
    };

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        setStudentQuery(student.name);
        setStudentResults([]);
        setForm((prev) => ({
            ...prev,
            student_id: student.id,
        }));
        setErrors((prev) => ({
            ...prev,
            student_id: null,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);
        setErrors({});
        setResult(null);

        try {
            const response = await axios.post("/evaluator/evaluate", form);
            setResult(response.data.data);
        } catch (error) {
            if (error.response?.status === 422) {
                setErrors(error.response.data.errors ?? {});
            } else {
                console.error(error);
                alert("Something went wrong while evaluating.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setForm(initialForm);
        setErrors({});
        setResult(null);
        setStudentQuery("");
        setStudentResults([]);
        setSelectedStudent(null);
    };

    return (
        <AdminLayout>
            <div className="mx-auto max-w-7xl ">
                <div className="overflow-hidden rounded-[28px] bg-[#F7F4EE] shadow-xl">
                    <div
                        className="flex items-center gap-4 px-6 py-4 text-white"
                        style={{
                            background: `linear-gradient(90deg, ${THEME.maroon}, ${THEME.maroonDark})`,
                        }}
                    >
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
                            🎯
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold leading-none">OLSAT Evaluator</h1>
                            <p className="mt-2 text-sm text-white/85">
                                Cavite Institute · Student Entry Form
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 p-4 xl:grid-cols-3">
                        <div className="space-y-6 xl:col-span-2">
                            <Card className="p-4">
                                <SectionTitle
                                    title="Student Information"
                                    subtitle="Search and select the student, then confirm the birthdate and grade."
                                />

                                <div ref={searchBoxRef} className="relative">
                                    <Label>Student Search</Label>
                                    <Input
                                        type="text"
                                        value={studentQuery}
                                        onChange={(e) => {
                                            setStudentQuery(e.target.value);
                                            setSelectedStudent(null);
                                            setForm((prev) => ({ ...prev, student_id: "" }));
                                        }}
                                        placeholder="Search by student name or ID"
                                        error={errors.student_id}
                                    />

                                    {studentLoading && (
                                        <p className="mt-2 text-sm text-slate-500">Searching...</p>
                                    )}

                                    {studentResults.length > 0 && (
                                        <div className="absolute z-30 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border bg-white shadow-xl">
                                            {studentResults.map((student) => (
                                                <button
                                                    key={student.id}
                                                    type="button"
                                                    onClick={() => handleSelectStudent(student)}
                                                    className="block w-full border-b px-4 py-3 text-left hover:bg-[#FBF7EE]"
                                                    style={{ borderColor: "#F1E7D5" }}
                                                >
                                                    <div className="font-semibold text-slate-800">
                                                        {student.name}
                                                    </div>
                                                    <div className="text-xs text-slate-500">
                                                        Grade {student.grade} • {student.student_id || "No ID"}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    {errors.student_id && (
                                        <p className="mt-2 text-sm text-red-600">
                                            {errors.student_id[0]}
                                        </p>
                                    )}
                                </div>

                                <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div>
                                        <Label>Name</Label>
                                        <Input
                                            value={selectedStudent?.name || ""}
                                            readOnly
                                            placeholder="Selected student name"
                                        />
                                    </div>

                                    <div>
                                        <Label>Student ID</Label>
                                        <Input
                                            value={selectedStudent?.student_id || ""}
                                            readOnly
                                            placeholder="Student ID"
                                        />
                                    </div>

                                    <div>
                                        <Label>Date of Birth</Label>
                                        <Input
                                            value={selectedStudent?.birthdate ? formatDisplayDate(selectedStudent.birthdate) : ""}
                                            readOnly
                                            placeholder="No birthdate found"
                                        />
                                    </div>

                                    <div>
                                        <Label>Grade</Label>
                                        <Input
                                            value={selectedStudent?.grade || ""}
                                            readOnly
                                            placeholder="Grade"
                                        />
                                    </div>
                                </div>
                            </Card>

                            <Card className="p-4">
                                <SectionTitle
                                    title="Raw Scores"
                                    subtitle="Encode the raw scores from the OLSAT score record."
                                />

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    <div>
                                        <Label>Total</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            name="total"
                                            value={form.total}
                                            onChange={handleChange}
                                            error={errors.total}
                                            placeholder="0"
                                        />
                                        {errors.total && (
                                            <p className="mt-2 text-sm text-red-600">{errors.total[0]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Verbal</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            name="verbal"
                                            value={form.verbal}
                                            onChange={handleChange}
                                            error={errors.verbal}
                                            placeholder="0"
                                        />
                                        {errors.verbal && (
                                            <p className="mt-2 text-sm text-red-600">{errors.verbal[0]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Nonverbal</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            name="nonverbal"
                                            value={form.nonverbal}
                                            onChange={handleChange}
                                            error={errors.nonverbal}
                                            placeholder="0"
                                        />
                                        {errors.nonverbal && (
                                            <p className="mt-2 text-sm text-red-600">{errors.nonverbal[0]}</p>
                                        )}
                                    </div>
                                </div>

                                {errors.lookup && (
                                    <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        {errors.lookup[0]}
                                    </div>
                                )}
                            </Card>
                        </div>

                        <div className="space-y-6">
                            <Card className="p-4">
                                <SectionTitle
                                    title="Test Details"
                                    subtitle="Set the OLSAT assessment information."
                                />

                                <div className="space-y-4">
                                    <div>
                                        <Label>OLSAT Level</Label>
                                        <Select
                                            name="level"
                                            value={form.level}
                                            onChange={handleChange}
                                        >
                                            <option value="E">E</option>
                                            <option value="F">F</option>
                                            <option value="G">G</option>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Form</Label>
                                        <Input
                                            name="form"
                                            value={form.form}
                                            onChange={handleChange}
                                            placeholder="Form 5"
                                        />
                                    </div>

                                    <div>
                                        <Label>Test Date</Label>
                                        <Input
                                            type="date"
                                            name="test_date"
                                            value={form.test_date}
                                            onChange={handleChange}
                                            error={errors.test_date}
                                        />
                                        {errors.test_date && (
                                            <p className="mt-2 text-sm text-red-600">{errors.test_date[0]}</p>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            <div
                                className="rounded-[24px] border p-4 text-center shadow-sm"
                                style={{
                                    borderColor: THEME.gold,
                                    backgroundColor: THEME.cream,
                                }}
                            >
                                <p
                                    className="text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: THEME.maroon }}
                                >
                                    Age (Years / Months)
                                </p>

                                <div className="mt-6 flex items-end justify-center gap-6">
                                    <div>
                                        <div
                                            className="text-4xl font-bold"
                                            style={{ color: THEME.maroon }}
                                        >
                                            {age.years !== "" ? age.years : "--"}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-500">Years</div>
                                    </div>

                                    <div
                                        className="pb-2 text-4xl font-bold"
                                        style={{ color: THEME.gold }}
                                    >
                                        /
                                    </div>

                                    <div>
                                        <div
                                            className="text-4xl font-bold"
                                            style={{ color: THEME.maroon }}
                                        >
                                            {age.months !== "" ? age.months : "--"}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-500">Months</div>
                                    </div>
                                </div>

                                <p className="mt-5 text-sm text-slate-500">
                                    Computed from Date of Birth and Test Date
                                </p>
                            </div>

                            

                            {result && (
                                <Card className="p-5">
                                    <SectionTitle
                                        title="Evaluation Result"
                                        subtitle="Converted scaled scores"
                                    />

                                    <div className="space-y-3">
                                        <div
                                            className="rounded-2xl p-4 text-white"
                                            style={{ backgroundColor: THEME.maroon }}
                                        >
                                            <p className="text-sm text-white/80">Total Scaled Score</p>
                                            <p className="mt-2 text-3xl font-bold">
                                                {result.total.scaled_score}
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="rounded-2xl border p-4" style={{ borderColor: THEME.border }}>
                                                <p className="text-sm text-slate-500">Verbal</p>
                                                <p className="mt-2 text-2xl font-bold">{result.verbal.scaled_score}</p>
                                            </div>
                                            <div className="rounded-2xl border p-4" style={{ borderColor: THEME.border }}>
                                                <p className="text-sm text-slate-500">Nonverbal</p>
                                                <p className="mt-2 text-2xl font-bold">{result.nonverbal.scaled_score}</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </div>
                      
                        <div className="space-y-3 col-span-3">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full rounded-2xl px-5 py-3 text-sm font-semibold text-white transition disabled:opacity-60"
                                style={{ backgroundColor: THEME.maroon }}
                            >
                                {submitting ? "Evaluating..." : "Evaluate Score"}
                            </button>

                            <button
                                type="button"
                                onClick={handleReset}
                                className="w-full rounded-2xl border px-5 py-3 text-sm font-semibold transition"
                                style={{
                                    borderColor: THEME.maroon,
                                    color: THEME.maroon,
                                    backgroundColor: "white",
                                }}
                            >
                                Reset Form
                            </button>
                        </div>                      
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}