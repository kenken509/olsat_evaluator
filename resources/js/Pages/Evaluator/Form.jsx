import { useState } from "react";
import { calculateAge } from "@/utils/dateUtils";
import axios from "axios";

const initialForm = {
  name: "",
  teacher: "",
  school: "",
  dob: "",
  testDate: "",
  gender: "",
  grade: "",
  level: "F",
  form: "Form 5",
  total: "",
  verbal: "",
  nonverbal: "",
};



export default function Form() {
  const [form, setForm] = useState(initialForm);
  const [age, setAge] = useState({ years: "", months: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        age,
      };

      const { data } = await axios.post("/evaluator/evaluate", payload);

      console.log("Evaluation result:", data);

    } catch (error) {
      console.error("Submit error:", error.response?.data || error.message);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-app outline-none transition focus:border-accent focus:ring-2 focus:ring-yellow-200";

  const labelClass =
    "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-primary";

  const cardClass =
    "rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5";

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);
    setAge(calculateAge(updatedForm.dob, updatedForm.testDate));
  };

  const handleReset = () => {
    setForm(initialForm);
    setAge({ years: "", months: "" });
  };



  return (
    <div className="min-h-screen bg-app px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl">
          <div className="bg-primary px-5 py-5 text-white sm:px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <img
                  src="/storage/Images/logo.png"
                  alt="Cavite Institute Logo"
                  className="h-10 w-10 object-contain"
                />
              </div>

              <div className="min-w-0">
                <h1 className="text-xl font-bold sm:text-2xl">
                  OLSAT Evaluator
                </h1>
                <p className="text-sm text-yellow-100 sm:text-base">
                  Cavite Institute · Student Entry Form
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
            <div className="grid gap-6 xl:grid-cols-12">
              <div className="space-y-6 xl:col-span-8">
                <section className={cardClass}>
                  <div className="mb-4">
                    <h2 className="text-base font-bold text-primary sm:text-lg">
                      Student Information
                    </h2>
                    <p className="text-sm text-gray-500">
                      Enter the student details exactly as shown on the OLSAT form.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="md:col-span-2">
                      <label className={labelClass}>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter student name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Teacher</label>
                      <input
                        type="text"
                        name="teacher"
                        value={form.teacher}
                        onChange={handleChange}
                        placeholder="Enter teacher name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>School</label>
                      <input
                        type="text"
                        name="school"
                        value={form.school}
                        onChange={handleChange}
                        placeholder="Enter school name"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Date of Birth</label>
                      <input
                        type="date"
                        name="dob"
                        value={form.dob}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Test Date</label>
                      <input
                        type="date"
                        name="testDate"
                        value={form.testDate}
                        onChange={handleChange}
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Gender</label>
                      <select
                        name="gender"
                        value={form.gender}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Grade</label>
                      <select
                        name="grade"
                        value={form.grade}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="">Select grade</option>
                        {Array.from({ length: 9 }, (_, i) => i + 4).map((grade) => (
                          <option key={grade} value={grade}>
                            {grade}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </section>

                <section className={cardClass}>
                  <div className="mb-4">
                    <h2 className="text-base font-bold text-primary sm:text-lg">
                      Raw Scores
                    </h2>
                    <p className="text-sm text-gray-500">
                      Encode the raw scores from the OLSAT score record.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className={labelClass}>Total</label>
                      <input
                        type="number"
                        name="total"
                        value={form.total}
                        onChange={handleChange}
                        placeholder="0"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Verbal</label>
                      <input
                        type="number"
                        name="verbal"
                        value={form.verbal}
                        onChange={handleChange}
                        placeholder="0"
                        className={inputClass}
                      />
                    </div>

                    <div>
                      <label className={labelClass}>Nonverbal</label>
                      <input
                        type="number"
                        name="nonverbal"
                        value={form.nonverbal}
                        onChange={handleChange}
                        placeholder="0"
                        className={inputClass}
                      />
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-6 xl:col-span-4">
                <section className={cardClass}>
                  <div className="mb-4">
                    <h2 className="text-base font-bold text-primary sm:text-lg">
                      Test Details
                    </h2>
                    <p className="text-sm text-gray-500">
                      Set the OLSAT assessment information.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className={labelClass}>OLSAT Level</label>
                      <select
                        name="level"
                        value={form.level}
                        onChange={handleChange}
                        className={inputClass}
                      >
                        <option value="E">E</option>
                        <option value="F">F</option>
                        <option value="G">G</option>
                      </select>
                    </div>

                    <div>
                      <label className={labelClass}>Form</label>
                      <input
                        type="text"
                        name="form"
                        value={form.form}
                        readOnly
                        className="w-full rounded-xl border border-gray-300 bg-gray-100 px-4 py-3 text-sm text-gray-500 outline-none"
                      />
                    </div>
                  </div>
                </section>

                <section className="rounded-2xl border border-accent bg-yellow-50 p-4 shadow-sm sm:p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-secondary">
                    Age (Years / Months)
                  </p>

                  <div className="mt-3 flex items-center justify-center gap-4">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">
                        {age.years !== "" ? age.years : "--"}
                      </p>
                      <p className="text-xs text-gray-500">Years</p>
                    </div>

                    <span className="text-2xl font-bold text-accent">/</span>

                    <div className="text-center">
                      <p className="text-3xl font-bold text-primary">
                        {age.months !== "" ? age.months : "--"}
                      </p>
                      <p className="text-xs text-gray-500">Months</p>
                    </div>
                  </div>

                  <p className="mt-3 text-center text-sm text-gray-500">
                    Computed from Date of Birth and Test Date
                  </p>
                </section>

                <section className={cardClass}>
                  <div className="space-y-3">
                    <button
                      type="submit"
                      className="w-full rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-secondary"
                    >
                      Evaluate Score
                    </button>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="w-full rounded-xl border border-primary bg-white px-4 py-3 text-sm font-semibold text-primary transition hover:bg-red-50"
                    >
                      Reset Form
                    </button>
                  </div>

                  <div className="mt-4 border-t border-gray-200 pt-4 text-center text-xs text-gray-400">
                    Developed by{" "}
                    <span className="font-semibold text-primary">
                      Aries B. Llesis
                    </span>
                  </div>
                </section>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}