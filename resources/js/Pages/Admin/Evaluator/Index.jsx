import AdminLayout from "../../../Layouts/AdminLayout";
import PreviewModal from "./Components/PreviewModal";
import axios from "axios";
import Swal from "sweetalert2";
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
    verbal_comprehension: "",
    verbal_reasoning: "",
    nonverbal_figural_reasoning: "",
    nonverbal_quantitative_reasoning: "",
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

function toNumber(value) {
    if (value === "" || value === null || value === undefined) return 0;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
}

function Card({ children, className = "" }) {
    return (
        <div
            className={`rounded-[24px] border bg-white shadow-sm ${className}`}
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

function SummaryMetric({ label, value }) {
    return (
        <div
            className="rounded-2xl border bg-white p-4"
            style={{ borderColor: THEME.border }}
        >
            <p className="text-sm text-slate-500">{label}</p>
            <p className="mt-2 text-2xl font-bold" style={{ color: THEME.maroon }}>
                {value ?? "—"}
            </p>
        </div>
    );
}

export default function Index() {
    const [resetAfterPreview, setResetAfterPreview] = useState(false);
    const [form, setForm] = useState(initialForm);
    const [errors, setErrors] = useState({});
    const [result, setResult] = useState(null);
    const [evaluationId, setEvaluationId] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);

    const [studentQuery, setStudentQuery] = useState("");
    const [studentResults, setStudentResults] = useState([]);
    const [studentLoading, setStudentLoading] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState(null);

    const searchBoxRef = useRef(null);

    const age = useMemo(() => {
        return calculateAgeBreakdown(selectedStudent?.birthdate, form.test_date);
    }, [selectedStudent, form.test_date]);

    const computedScores = useMemo(() => {
        const verbal =
            toNumber(form.verbal_comprehension) + toNumber(form.verbal_reasoning);

        const nonverbal =
            toNumber(form.nonverbal_figural_reasoning) +
            toNumber(form.nonverbal_quantitative_reasoning);

        const total = verbal + nonverbal;

        return { verbal, nonverbal, total };
    }, [
        form.verbal_comprehension,
        form.verbal_reasoning,
        form.nonverbal_figural_reasoning,
        form.nonverbal_quantitative_reasoning,
    ]);

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

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

        setErrors((prev) => ({
            ...prev,
            [name]: null,
            total: null,
            verbal: null,
            nonverbal: null,
            lookup: null,
        }));
    };

    const handleSelectStudent = (student) => {
        setSelectedStudent(student);
        setStudentQuery(student.name);
        setStudentResults([]);
        setResult(null);
        setEvaluationId(null);

        setForm((prev) => ({
            ...prev,
            student_id: student.id,
        }));

        setErrors((prev) => ({
            ...prev,
            student_id: null,
            grade: null,
            age_years: null,
            age_months: null,
        }));
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setErrors({});

    try {
        const payload = {
            ...form,
            student_name: selectedStudent?.name ?? null,
            grade: selectedStudent?.grade ? Number(selectedStudent.grade) : null,
            age_years: age.years === "" ? null : Number(age.years),
            age_months: age.months === "" ? null : Number(age.months),
            verbal: computedScores.verbal,
            nonverbal: computedScores.nonverbal,
            total: computedScores.total,
        };

        const response = await axios.post("/evaluator/evaluate", payload);

        if (response?.data?.data) {
            setResult(response.data.data);
            setEvaluationId(response.data.evaluation_id ?? null);
            setResetAfterPreview(true);

            await Swal.fire({
                icon: "success",
                title: "Evaluation Saved",
                text: response.data.message || "Evaluation completed successfully.",
                confirmButtonText: "Open Preview",
                confirmButtonColor: THEME.maroon,
                background: "#FFFDFC",
                color: "#3F3F46",
            });

            setPreviewOpen(true);
        }
    } catch (error) {
        if (error.response?.status === 422) {
            const responseErrors = error.response.data.errors ?? {};
            setErrors(responseErrors);

            await Swal.fire({
                icon: "warning",
                title: "Please review the form",
                text:
                    responseErrors.lookup?.[0] ||
                    "Some fields need attention before evaluation can continue.",
                confirmButtonColor: THEME.maroon,
                background: "#FFFDFC",
                color: "#3F3F46",
            });
        } else {
            console.error(error);

            await Swal.fire({
                icon: "error",
                title: "Evaluation Failed",
                text: "Something went wrong while evaluating the student.",
                confirmButtonColor: THEME.maroon,
                background: "#FFFDFC",
                color: "#3F3F46",
            });
        }
    } finally {
        setSubmitting(false);
    }
};

    const handleReset = async () => {
    const confirmation = await Swal.fire({
        icon: "question",
        title: "Reset form?",
        text: "This will clear the current student and score entries.",
        showCancelButton: true,
        confirmButtonText: "Yes, reset",
        cancelButtonText: "Cancel",
        confirmButtonColor: THEME.maroon,
        cancelButtonColor: "#6B7280",
        background: "#FFFDFC",
        color: "#3F3F46",
    });

    if (!confirmation.isConfirmed) return;

    clearFormState();
};
    const clearFormState = () => {
        setForm(initialForm);
        setErrors({});
        setResult(null);
        setEvaluationId(null);
        setPreviewOpen(false);
        setResetAfterPreview(false);
        setStudentQuery("");
        setStudentResults([]);
        setSelectedStudent(null);
    };

    const handlePreviewClose = () => {
        setPreviewOpen(false);

        if (resetAfterPreview) {
            clearFormState();
        }
    };

    return (
        <AdminLayout>
            <div className="mx-auto max-w-7xl">
                <div className="overflow-hidden rounded-[30px] bg-[#F7F4EE]  shadow-[0_25px_60px_rgba(0,0,0,0.08)]">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-2 p-4 xl:grid-cols-3">
                        <div className="space-y-2 xl:col-span-2">
                            <Card className="p-5">
                                <SectionTitle
                                    title="Student Information"
                                    subtitle="Search and select a student record. Grade and birthdate are loaded automatically."
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
                                        placeholder="Search by student name or student ID"
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
                                                    className="block w-full border-b px-4 py-3 text-left transition hover:bg-[#FBF7EE]"
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
                                        <p className="mt-2 text-sm text-red-600">{errors.student_id[0]}</p>
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
                                            value={
                                                selectedStudent?.birthdate
                                                    ? formatDisplayDate(selectedStudent.birthdate)
                                                    : ""
                                            }
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
                                        {errors.grade && (
                                            <p className="mt-2 text-sm text-red-600">{errors.grade[0]}</p>
                                        )}
                                    </div>
                                </div>
                            </Card>

                            <Card className="px-5 py-2">
                                <SectionTitle
                                    title="Raw Scores"
                                    subtitle="Enter the detailed subtest scores. Total, verbal, and nonverbal are computed automatically."
                                /> 
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-4 pt-2">
                                     <div>
                                        <Label>Verbal Comprehension</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            name="verbal_comprehension"
                                            value={form.verbal_comprehension}
                                            onChange={handleChange}
                                            error={errors.verbal_comprehension}
                                            placeholder="0"
                                        />
                                        {errors.verbal_comprehension && (
                                            <p className="mt-2 text-sm text-red-600">{errors.verbal_comprehension[0]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Verbal Reasoning</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            name="verbal_reasoning"
                                            value={form.verbal_reasoning}
                                            onChange={handleChange}
                                            error={errors.verbal_reasoning}
                                            placeholder="0"
                                        />
                                        {errors.verbal_reasoning && (
                                            <p className="mt-2 text-sm text-red-600">{errors.verbal_reasoning[0]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Figural Reasoning</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            name="nonverbal_figural_reasoning"
                                            value={form.nonverbal_figural_reasoning}
                                            onChange={handleChange}
                                            error={errors.nonverbal_figural_reasoning}
                                            placeholder="0"
                                        />
                                        {errors.nonverbal_figural_reasoning && (
                                            <p className="mt-2 text-sm text-red-600">{errors.nonverbal_figural_reasoning[0]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Quantitative Reasoning</Label>
                                        <Input
                                            type="number"
                                            min="0"
                                            name="nonverbal_quantitative_reasoning"
                                            value={form.nonverbal_quantitative_reasoning}
                                            onChange={handleChange}
                                            error={errors.nonverbal_quantitative_reasoning}
                                            placeholder="0"
                                        />
                                        {errors.nonverbal_quantitative_reasoning && (
                                            <p className="mt-2 text-sm text-red-600">{errors.nonverbal_quantitative_reasoning[0]}</p>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex flex-col gap-2 pt-4">
                                    <div>
                                        <Label>Total : {computedScores.total ?? 0}</Label>                                      
                                        {errors.total && (
                                            <p className="mt-2 text-sm text-red-600">{errors.total[0]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Verbal: {computedScores.verbal ?? 0}</Label>                                    
                                        {errors.verbal && (
                                            <p className="mt-2 text-sm text-red-600">{errors.verbal[0]}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Label>Nonverbal: {computedScores.nonverbal ?? 0}</Label>
                                    </div>
                                </div>
                                {errors.lookup && (
                                    <div className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                        {errors.lookup[0]}
                                    </div>
                                )}
                            </Card>
                        </div>

                        <div className="space-y-2">
                            <Card className="p-5">
                                <SectionTitle
                                    title="Test Details"
                                    subtitle="Set the OLSAT administration details."
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
                                            disabled
                                        />
                                        {errors.form && (
                                            <p className="mt-2 text-sm text-red-600">{errors.form[0]}</p>
                                        )}
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
                                className="rounded-[24px] border p-2 text-center shadow-sm"
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
                                            className="text-5xl font-bold"
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
                                            className="text-5xl font-bold"
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

                                {(errors.age_years || errors.age_months) && (
                                    <div className="mt-3 text-sm text-red-600">
                                        {errors.age_years?.[0] || errors.age_months?.[0]}
                                    </div>
                                )}
                            </div>

                           <div className="mt-5 grid grid-cols-1 gap-3">
                                        <button
                                            type="submit"
                                            disabled={submitting}
                                            className="w-full rounded-2xl px-5 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
                                            style={{ backgroundColor: THEME.maroon }}
                                        >
                                            {submitting ? "Evaluating..." : "Evaluate & Save"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleReset}
                                            className="w-full rounded-2xl border px-5 py-3 text-sm font-semibold transition cursor-pointer"
                                            style={{
                                                borderColor: THEME.maroon,
                                                color: THEME.maroon,
                                                backgroundColor: "white",
                                            }}
                                        >
                                            Reset Form
                                        </button>
                                    </div>

                                {evaluationId && (
                                    <div className="mt-4 rounded-2xl bg-[#FBF7EE] px-4 py-3 text-sm text-slate-700">
                                        Saved Record ID:{" "}
                                        <span className="font-bold" style={{ color: THEME.maroon }}>
                                            {evaluationId}
                                        </span>
                                    </div>
                                )}
                        </div>
                    </form>
                </div>
            </div>

            <PreviewModal
                open={previewOpen}
                onClose={handlePreviewClose}
                data={result}
                evaluationId={evaluationId}
                theme={THEME}
            />
        </AdminLayout>
    );
}