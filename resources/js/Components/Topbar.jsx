export default function Topbar({ title, subtitle, onMenuClick }) {
    return (
        <header className="sticky top-0 z-20 border-b border-black/5 bg-white/90 px-4 py-4 shadow-sm backdrop-blur md:px-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={onMenuClick}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-white text-primary shadow-sm transition hover:bg-app cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1.8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>

                    <div>
                        <h2 className="text-xl font-bold text-primary md:text-2xl">
                            {title}
                        </h2>
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    </div>
                </div>
            </div>
        </header>
    );
}