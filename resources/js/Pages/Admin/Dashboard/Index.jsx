import AdminLayout from "../../../Layouts/AdminLayout";
import {
    FiUsers,
    FiActivity,
    FiTrendingUp,
    FiClock,
    FiUserCheck,
} from "react-icons/fi";
import { PiStudentLight } from "react-icons/pi";
import { CiViewTable } from "react-icons/ci";
import { IoShieldCheckmarkOutline } from "react-icons/io5";

export default function Dashboard() {
    const stats = [
        {
            title: "Total Users",
            value: "1,284",
            change: "+12.4%",
            changeType: "up",
            icon: <FiUsers className="text-xl" />,
            description: "Registered system users",
        },
        {
            title: "Students Assessed",
            value: "842",
            change: "+8.1%",
            changeType: "up",
            icon: <PiStudentLight className="text-xl" />,
            description: "Processed this semester",
        },
        {
            title: "Spring Norm Entries",
            value: "156",
            change: "+3.2%",
            changeType: "up",
            icon: <CiViewTable className="text-xl" />,
            description: "Available norm records",
        },
        {
            title: "Audit Events",
            value: "3,921",
            change: "-1.8%",
            changeType: "down",
            icon: <IoShieldCheckmarkOutline className="text-xl" />,
            description: "Tracked system actions",
        },
    ];

    const conversionPerformance = [
        { label: "OLSAT Encoding", value: 88 },
        { label: "Spring Norm Mapping", value: 76 },
        { label: "Report Generation", value: 92 },
        { label: "Audit Validation", value: 81 },
    ];

    const recentActivities = [
        {
            title: "New student result encoded",
            time: "10 mins ago",
            type: "success",
        },
        {
            title: "Audit log exported by administrator",
            time: "25 mins ago",
            type: "info",
        },
        {
            title: "Spring norms updated",
            time: "1 hour ago",
            type: "warning",
        },
        {
            title: "User role changed for registrar account",
            time: "2 hours ago",
            type: "danger",
        },
    ];

    const moduleUsage = [
        { name: "Dashboard", value: 94 },
        { name: "Users", value: 68 },
        { name: "Students", value: 87 },
        { name: "Spring Norms", value: 72 },
        { name: "Audit Logs", value: 80 },
    ];

    const topUsers = [
        { name: "Admin Office", role: "Administrator", actions: 324 },
        { name: "Guidance Staff", role: "Staff", actions: 211 },
        { name: "Registrar", role: "Manager", actions: 186 },
        { name: "Testing Unit", role: "Analyst", actions: 143 },
    ];

    const getActivityColor = (type) => {
        switch (type) {
            case "success":
                return "bg-green-500";
            case "warning":
                return "bg-yellow-500";
            case "danger":
                return "bg-red-500";
            default:
                return "bg-blue-500";
        }
    };

    return (
        <AdminLayout>
            <div className="space-y-6">
                {/* Overview / Hero */}
                

                {/* Stat cards */}
                <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-4">
                    {stats.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-500">
                                        {item.title}
                                    </p>
                                    <h3 className="mt-2 text-3xl font-bold text-primary">
                                        {item.value}
                                    </h3>
                                </div>

                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    {item.icon}
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-3">
                                <span
                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                                        item.changeType === "up"
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                    }`}
                                >
                                    {item.change}
                                </span>

                                <span className="text-xs text-gray-500">
                                    vs last month
                                </span>
                            </div>

                            <p className="mt-3 text-sm text-gray-600">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Main analytics area */}
                <section className="grid grid-cols-1 gap-6 2xl:grid-cols-12">
                    {/* Left content */}
                    <div className="space-y-6 2xl:col-span-8">
                        {/* Performance overview */}
                        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm md:p-6">
                            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-primary md:text-xl">
                                        Conversion Workflow Performance
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        Operational status of key analytics
                                        modules
                                    </p>
                                </div>

                                <div className="inline-flex items-center gap-2 rounded-xl bg-accent/15 px-3 py-2 text-sm font-medium text-primary">
                                    <FiTrendingUp />
                                    Stable Performance
                                </div>
                            </div>

                            <div className="space-y-5">
                                {conversionPerformance.map((item) => (
                                    <div key={item.label}>
                                        <div className="mb-2 flex items-center justify-between text-sm">
                                            <span className="font-medium text-gray-700">
                                                {item.label}
                                            </span>
                                            <span className="font-semibold text-primary">
                                                {item.value}%
                                            </span>
                                        </div>
                                        <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                                            <div
                                                className="h-full rounded-full bg-primary"
                                                style={{
                                                    width: `${item.value}%`,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Usage and system summary */}
                        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                            <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm md:p-6">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                        <FiActivity className="text-lg" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-primary">
                                            Module Usage
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Most accessed admin sections
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {moduleUsage.map((item) => (
                                        <div key={item.name}>
                                            <div className="mb-2 flex items-center justify-between text-sm">
                                                <span className="text-gray-700">
                                                    {item.name}
                                                </span>
                                                <span className="font-semibold text-primary">
                                                    {item.value}%
                                                </span>
                                            </div>
                                            <div className="h-2.5 overflow-hidden rounded-full bg-gray-100">
                                                <div
                                                    className="h-full rounded-full bg-secondary"
                                                    style={{
                                                        width: `${item.value}%`,
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm md:p-6">
                                <div className="mb-5 flex items-center gap-3">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/20 text-primary">
                                        <FiUserCheck className="text-lg" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-primary">
                                            Top Active Personnel
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Based on total actions performed
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {topUsers.map((user, index) => (
                                        <div
                                            key={user.name}
                                            className="flex items-center justify-between rounded-2xl bg-app px-4 py-3"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-semibold text-white">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-800">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {user.role}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-primary">
                                                    {user.actions}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    actions
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right content */}
                    <div className="space-y-6 2xl:col-span-4">
                        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm md:p-6">
                            <div className="mb-5 flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <FiClock className="text-lg" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-primary">
                                        Recent Activity
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        Latest system actions
                                    </p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div
                                        key={activity.title}
                                        className="flex gap-3 rounded-2xl border border-gray-100 p-3"
                                    >
                                        <div
                                            className={`mt-1 h-3 w-3 rounded-full ${getActivityColor(
                                                activity.type
                                            )}`}
                                        />
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-gray-800">
                                                {activity.title}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500">
                                                {activity.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl bg-gradient-to-br from-primary to-secondary p-5 text-white shadow-sm md:p-6">
                            <p className="text-sm text-white/70">
                                System Health
                            </p>
                            <h3 className="mt-2 text-2xl font-bold">
                                Excellent
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-white/80">
                                Core admin services are stable. Conversion,
                                reporting, and audit tracking modules are
                                working within normal thresholds.
                            </p>

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                                    <p className="text-xs text-white/70">
                                        Uptime
                                    </p>
                                    <p className="mt-1 text-lg font-bold">
                                        99.8%
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
                                    <p className="text-xs text-white/70">
                                        Response Time
                                    </p>
                                    <p className="mt-1 text-lg font-bold">
                                        0.9s
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-3xl border border-black/5 bg-white p-5 shadow-sm md:p-6">
                            <h3 className="font-bold text-primary">
                                Quick Insights
                            </h3>
                            <div className="mt-4 space-y-3">
                                <div className="rounded-2xl bg-app p-4">
                                    <p className="text-sm font-medium text-gray-700">
                                        Peak user activity occurs between
                                        8:00 AM and 11:00 AM.
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-app p-4">
                                    <p className="text-sm font-medium text-gray-700">
                                        Student assessment processing increased
                                        by 8.1% this month.
                                    </p>
                                </div>
                                <div className="rounded-2xl bg-app p-4">
                                    <p className="text-sm font-medium text-gray-700">
                                        Audit log events remain within expected
                                        operational volume.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </AdminLayout>
    );
}