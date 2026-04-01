import { useEffect, useState } from "react";
import axios from "axios";

export default function Index() {
    const [data, setData] = useState([]);
    const [level, setLevel] = useState("A");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData(level);
    }, [level]);

    const fetchData = async (selectedLevel) => {
        setLoading(true);
        try {
            const res = await axios.get(`/conversion-table-data?level=${selectedLevel}`);
            setData(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // ✅ SORT properly (important fix)
    const total = data
        .filter(d => d.type === "total")
        .sort((a, b) => b.raw_score - a.raw_score);

    const verbal = data
        .filter(d => d.type === "verbal")
        .sort((a, b) => b.raw_score - a.raw_score);

    const nonverbal = data
        .filter(d => d.type === "nonverbal")
        .sort((a, b) => b.raw_score - a.raw_score);

    return (
        <div className="bg-app min-h-screen p-6">
            <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-200">

                {/* HEADER */}
                <div className="bg-primary text-white px-6 py-4 rounded-t-2xl flex justify-between items-center">
                    <h1 className="text-xl font-bold tracking-wide">
                        Conversion Table (Level {level})
                    </h1>

                    {/* LEVEL BUTTONS */}
                    <div className="flex gap-2">
                        {["A","B","C","D","E","F","G"].map(l => (
                            <button
                                key={l}
                                onClick={() => setLevel(l)}
                                className={`px-3 py-1 rounded-lg text-sm font-semibold transition
                                    ${level === l 
                                        ? "bg-accent text-black" 
                                        : "bg-white text-primary border border-primary hover:bg-gray-100"}
                                `}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>

                {/* TABLE */}
                <div className="overflow-x-auto">

                    {loading ? (
                        <div className="p-6 text-center text-gray-500">
                            Loading...
                        </div>
                    ) : (
                        <table className="w-full text-sm text-center border-collapse">

                            <thead>
                                <tr className="bg-secondary text-white">
                                    <th colSpan="2" className="py-3 border-r border-accent">Total</th>
                                    <th colSpan="2" className="py-3 border-r border-accent">Verbal</th>
                                    <th colSpan="2" className="py-3">Nonverbal</th>
                                </tr>

                                <tr className="bg-accent text-black font-semibold">
                                    <th className="py-2">Raw</th>
                                    <th className="py-2 border-r border-primary">Scaled</th>

                                    <th className="py-2">Raw</th>
                                    <th className="py-2 border-r border-primary">Scaled</th>

                                    <th className="py-2">Raw</th>
                                    <th className="py-2">Scaled</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Array.from({ length: 60 }).map((_, i) => {
                                    const t = total[i];
                                    const v = verbal[i];
                                    const n = nonverbal[i];

                                    return (
                                        <tr
                                            key={i}
                                            className="even:bg-gray-50 hover:bg-yellow-50 transition"
                                        >
                                            {/* TOTAL */}
                                            <td className="py-2 text-app">{t?.raw_score ?? ""}</td>
                                            <td className="py-2 font-semibold text-primary border-r border-gray-200">
                                                {t?.scaled_score ?? ""}
                                            </td>

                                            {/* VERBAL */}
                                            <td className="py-2 text-app">{v?.raw_score ?? ""}</td>
                                            <td className="py-2 font-semibold text-secondary border-r border-gray-200">
                                                {v?.scaled_score ?? ""}
                                            </td>

                                            {/* NONVERBAL */}
                                            <td className="py-2 text-app">{n?.raw_score ?? ""}</td>
                                            <td className="py-2 font-semibold text-primary">
                                                {n?.scaled_score ?? ""}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}