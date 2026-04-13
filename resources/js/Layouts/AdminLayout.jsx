import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";
import { usePage } from "@inertiajs/react";
import { useState } from "react";

export default function AdminLayout({ children }) {
    const { header } = usePage().props;

    const title = header?.title ?? "Dashboard";
    const subtitle = header?.subtitle ?? "Overview of your system activity";

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="h-screen overflow-hidden bg-app text-app">
            <div className="relative flex h-full overflow-hidden">
                <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

                <main
                    className={`flex min-w-0 flex-1 flex-col overflow-hidden transition-all duration-300 ${
                        sidebarOpen ? "lg:ml-72" : "lg:ml-0"
                    }`}
                >
                    <Topbar
                        title={title}
                        subtitle={subtitle}
                        onMenuClick={() => setSidebarOpen((prev) => !prev)}
                    />

                    <section className="min-h-0 flex-1 overflow-hidden">
                        <div className="h-full overflow-y-auto px-4 py-6 md:px-6">
                            {children}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}