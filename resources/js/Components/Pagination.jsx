import React from "react";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

function buildPageItems(currentPage, lastPage, siblingCount = 2) {
    if (!lastPage || lastPage <= 1) return [];

    const pages = new Set([1, lastPage]);

    for (
        let page = Math.max(1, currentPage - siblingCount);
        page <= Math.min(lastPage, currentPage + siblingCount);
        page++
    ) {
        pages.add(page);
    }

    const sortedPages = [...pages].sort((a, b) => a - b);
    const items = [];

    for (let i = 0; i < sortedPages.length; i++) {
        const page = sortedPages[i];
        const prev = sortedPages[i - 1];

        if (i > 0 && page - prev > 1) {
            if (page - prev === 2) {
                items.push({ type: "page", page: prev + 1 });
            } else {
                items.push({ type: "ellipsis", key: `ellipsis-${prev}-${page}` });
            }
        }

        items.push({ type: "page", page });
    }

    return items;
}

export default function Pagination({
    links = [],
    currentPage = null,
    lastPage = null,
    onPageChange,
    loading = false,
    className = "",
}) {
    const hasLinksMode = Array.isArray(links) && links.length > 0;
    const hasNumericMode =
        Number.isInteger(currentPage) &&
        Number.isInteger(lastPage) &&
        lastPage > 1;

    if (!hasLinksMode && !hasNumericMode) return null;

    const buttonBase =
        "min-w-[48px] rounded-2xl border px-4 py-3 text-sm font-semibold transition";
    const activeButton = "border-[#8B1E1E] bg-[#8B1E1E] text-white";
    const idleButton =
        "border-[#8B1E1E]/20 bg-white text-[#8B1E1E] hover:bg-[#8B1E1E]/5";
    const disabledButton = "cursor-not-allowed opacity-50";
    const enabledButton = "cursor-pointer";

    if (hasLinksMode) {
        const previousLink = links[0];
        const nextLink = links[links.length - 1];
        const middleLinks = links.slice(1, -1);

        return (
            <div className={classNames("flex flex-wrap items-center gap-3", className)}>
                <button
                    type="button"
                    disabled={!previousLink?.url || loading}
                    onClick={() => onPageChange(previousLink.url)}
                    className={classNames(
                        buttonBase,
                        idleButton,
                        !previousLink?.url || loading ? disabledButton : enabledButton
                    )}
                >
                    &laquo; Previous
                </button>

                {middleLinks.map((link, index) => {
                    const isEllipsis =
                        String(link.label).includes("...") ||
                        String(link.label).includes("&hellip;");

                    if (isEllipsis) {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="min-w-[48px] px-2 text-center text-sm font-semibold text-slate-400"
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        );
                    }

                    return (
                        <button
                            key={`page-${index}`}
                            type="button"
                            disabled={!link.url || loading}
                            onClick={() => onPageChange(link.url)}
                            className={classNames(
                                buttonBase,
                                link.active ? activeButton : idleButton,
                                !link.url || loading ? disabledButton : enabledButton
                            )}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                })}

                <button
                    type="button"
                    disabled={!nextLink?.url || loading}
                    onClick={() => onPageChange(nextLink.url)}
                    className={classNames(
                        buttonBase,
                        idleButton,
                        !nextLink?.url || loading ? disabledButton : enabledButton
                    )}
                >
                    Next &raquo;
                </button>
            </div>
        );
    }

    const pageItems = buildPageItems(currentPage, lastPage, 2);

    return (
        <div className={classNames("flex flex-wrap items-center gap-3", className)}>
            <button
                type="button"
                disabled={currentPage <= 1 || loading}
                onClick={() => onPageChange(currentPage - 1)}
                className={classNames(
                    buttonBase,
                    idleButton,
                    currentPage <= 1 || loading ? disabledButton : enabledButton
                )}
            >
                &laquo; Previous
            </button>

            {pageItems.map((item, index) => {
                if (item.type === "ellipsis") {
                    return (
                        <span
                            key={item.key || `ellipsis-${index}`}
                            className="min-w-[48px] px-2 text-center text-sm font-semibold text-slate-400"
                        >
                            ...
                        </span>
                    );
                }

                const isActive = item.page === currentPage;

                return (
                    <button
                        key={item.page}
                        type="button"
                        disabled={loading}
                        onClick={() => onPageChange(item.page)}
                        className={classNames(
                            buttonBase,
                            isActive ? activeButton : idleButton,
                            loading ? disabledButton : enabledButton
                        )}
                    >
                        {item.page}
                    </button>
                );
            })}

            <button
                type="button"
                disabled={currentPage >= lastPage || loading}
                onClick={() => onPageChange(currentPage + 1)}
                className={classNames(
                    buttonBase,
                    idleButton,
                    currentPage >= lastPage || loading ? disabledButton : enabledButton
                )}
            >
                Next &raquo;
            </button>
        </div>
    );
}