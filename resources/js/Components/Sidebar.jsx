import { Link, usePage } from "@inertiajs/react";
import { AiOutlineDashboard } from "react-icons/ai";
import { PiStudentLight } from "react-icons/pi";
import { FiUsers, FiSettings } from "react-icons/fi";
import { CiViewTable } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import { LuArrowLeftRight } from "react-icons/lu";

export default function Sidebar({ open, setOpen }) {
    const { url } = usePage();

    const navItems = [
        { label: "Dashboard", href: "/admin-panel/dashboard", icon: <AiOutlineDashboard /> },
        { label: "Users", href: "/admin-panel/users", icon: <FiUsers /> },
        { label: "Students", href: "/admin-panel/students", icon: <PiStudentLight /> },
        { label: "Conversion Matrix", href: "/admin-panel/conversion-matrix", icon: <CiViewTable /> },
        { label: "Evaluator", href: "/evaluator", icon: <LuArrowLeftRight /> },
        { label: "Audit Logs", href: "/admin-panel/audit-logs", icon: <IoShieldCheckmarkOutline /> },
        { label: "Settings", href: "/admin/settings", icon: <FiSettings /> },
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
                className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col bg-primary text-white shadow-2xl transition-transform duration-300 ${
                    open ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
                    <div className="flex items-center gap-2">
                        <img
                            src="/storage/Images/logo.png"
                            alt="Cavite Institute Logo"
                            className="h-10 w-10 rounded-full bg-white object-contain"
                        />
                        <div>
                            <h1 className="text-2xl font-bold tracking-wide text-accent">
                                ADMIN PANEL
                            </h1>
                            <p className="text-sm text-white/70">Cavite Institute</p>
                        </div>
                    </div>

                    
                </div>

                <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
                    {navItems.map((item) => {
                        const active = url.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => {
                                    if (window.innerWidth < 1024) {
                                        setOpen(false);
                                    }
                                }}
                                className={`flex items-center gap-3 rounded-xl px-4 py-3 font-medium transition ${
                                    active
                                        ? "bg-white/15 text-white"
                                        : "text-white/80 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                <span className="text-lg">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="border-t border-white/20 p-4">
                    <div className="rounded-2xl bg-white/10 p-4">
                        <p className="text-sm text-white/70">Logged in as</p>
                        <h3 className="mt-1 font-semibold text-white">Administrator</h3>
                        <p className="text-sm text-accent">admin@cavite.edu</p>

                        <Link
                            href="/logout"
                            className="mt-4 block w-full rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-white/20 cursor-pointer"
                        >
                            Logout
                        </Link>
                    </div>
                </div>
            </aside>
        </>
    );
}