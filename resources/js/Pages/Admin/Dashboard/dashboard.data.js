import {
    FiActivity,
    FiBarChart2,
    FiClipboard,
    FiDatabase,
    FiRefreshCw,
    FiSettings,
    FiShield,
    FiUsers,
} from "react-icons/fi";

export const dashboardStats = [
    {
        label: "Active evaluators",
        value: "03",
        hint: "Administrator, registrar, and faculty access",
        icon: FiUsers,
    },
    {
        label: "Raw to scaled rows",
        value: "240",
        hint: "Conversion ranges currently loaded",
        icon: FiDatabase,
    },
    {
        label: "Scoring readiness",
        value: "99%",
        hint: "Core evaluator workflow is available",
        icon: FiBarChart2,
    },
    {
        label: "Security state",
        value: "Stable",
        hint: "No blocking platform alerts",
        icon: FiShield,
    },
];

export const quickActions = [
    {
        title: "Open evaluator",
        description: "Jump directly into the OLSAT evaluation workflow.",
        href: "/evaluator",
        icon: FiClipboard,
    },
    {
        title: "Review conversion table",
        description: "Inspect score mappings and verify table readiness.",
        href: "/conversion-table",
        icon: FiDatabase,
    },
    {
        title: "Refresh dashboard",
        description: "Reload the current admin summary and status blocks.",
        href: "/admin/dashboard",
        icon: FiRefreshCw,
    },
    {
        title: "Open settings",
        description: "Reserved slot for future system configuration tools.",
        href: null,
        icon: FiSettings,
        disabled: true,
    },
];

export const recentActivities = [
    {
        title: "Evaluator module checked",
        description:
            "The evaluator route is ready for scoring operations and user access.",
        time: "Just now",
        status: "Healthy",
        tone: "success",
    },
    {
        title: "Conversion mappings reviewed",
        description:
            "Raw-to-scaled and SAI reference tables were verified for availability.",
        time: "12 mins ago",
        status: "Reviewed",
        tone: "info",
    },
    {
        title: "Admin layout refreshed",
        description:
            "The dashboard shell and sidebar structure were updated for reuse.",
        time: "Today",
        status: "Updated",
        tone: "success",
    },
    {
        title: "User management pending",
        description:
            "User administration screens are still placeholders and can be wired next.",
        time: "Backlog",
        status: "Pending",
        tone: "warning",
    },
];

export const systemChecks = [
    {
        label: "Dashboard route",
        value: 100,
        note: "Admin entry point is available.",
    },
    {
        label: "Evaluator route",
        value: 100,
        note: "Scoring workspace is reachable.",
    },
    {
        label: "Conversion data access",
        value: 92,
        note: "Table screen is ready for inspection.",
    },
    {
        label: "Future admin modules",
        value: 38,
        note: "Users, logs, and settings can be added next.",
    },
];

export const pinnedLinks = [
    {
        label: "Dashboard",
        href: "/admin/dashboard",
    },
    {
        label: "Evaluator",
        href: "/evaluator",
    },
    {
        label: "Conversion Table",
        href: "/conversion-table",
    },
];
