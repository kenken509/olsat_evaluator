import { Link, usePage } from "@inertiajs/react";
import { AiOutlineDashboard } from "react-icons/ai";
import { PiStudentLight } from "react-icons/pi";
import { FiUsers } from "react-icons/fi";
import { CiViewTable } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";


export default function Sidebar({ open, setOpen }) {
    const { url } = usePage();

    const navItems = [
        { label: "Dashboard", href: "/admin/dashboard", icon: <AiOutlineDashboard /> },
        { label: "Users", href: "/admin/users", icon: <FiUsers /> },
        { label: "Students", href: "/admin/faculty", icon: <PiStudentLight /> },
        { label: "Spring Norms", href: "/admin/courses", icon: <CiViewTable /> },
        { label: "Audit Logs", href: "/admin/payments", icon: <IoShieldCheckmarkOutline /> },
        { label: "Settings", href: "/admin/settings", icon: "⚙️" },
    ];

    return (
        <>
            {open && (
                <button
                    type="button"
                    aria-label="Close sidebar overlay"
                    onClick={() => setOpen(false)}
                    className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                />
            )}

            <aside
                 className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 shrink-0 flex-col bg-primary text-white shadow-2xl transition-transform duration-300 lg:static lg:h-full lg:translate-x-0 ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                    <div className="flex gap-2 items-center justify-content-center ">
                        <img src='/storage/Images/logo.png' alt="Cavite Institute Logo" className="w-10 h-10 object-contain bg-white rounded-full" />
                        <div>
                            <h1 className="text-2xl font-bold tracking-wide text-accent">
                                ADMIN PANEL
                            </h1>
                            <p className="text-sm text-white/70">
                                Cavite Institute 
                            </p>
                        </div>
                        
                    </div>

                    <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="rounded-lg p-2 text-white/80 hover:bg-white/10 hover:text-white lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                <nav className="flex-1 space-y-2 px-4 py-6">
                    {navItems.map((item) => {
                        const active = url.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setOpen(false)}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                                    active
                                        ? "bg-white/15 text-white"
                                        : "text-white/80 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                <span>{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div >
                    <div className="border-t border-white/10 p-4">
                        <div className="rounded-2xl bg-white/10 p-4">
                            <p className="text-sm text-white/70">Logged in as</p>
                            <h3 className="mt-1 font-semibold text-white">Administrator</h3>
                            <p className="text-sm text-accent">admin@cavite.edu</p>

                            <button className="mt-4 w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20 cursor-pointer">
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}