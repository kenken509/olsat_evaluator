import axios from "axios";

function getLevelCode(label) {
    const match = String(label || "").match(/Level\s+([A-G])/i);
    return match ? match[1].toUpperCase() : "E";
}

function getAgeValue(label) {
    return String(label || "")
        .replace(/\s*y\/o$/i, "")
        .trim();
}

function getGradeRankValue(label) {
    return String(label || "")
        .replace(/^Grade\s+/i, "")
        .trim();
}

function getVerbalValue(label) {
    return String(label || "").trim();
}

const CATEGORY_REQUEST_MAP = {
    levels: {
        url: "/admin-panel/conversion-matrix/levels",
        buildParams: ({ selectedGroup, page, perPage }) => ({
            level: getLevelCode(selectedGroup),
            page,
            per_page: perPage,
        }),
    },

    ages: {
        url: "/admin-panel/conversion-matrix/ages",
        buildParams: ({ selectedGroup, page, perPage }) => ({
            age: getAgeValue(selectedGroup),
            page,
            per_page: perPage,
        }),
    },

    Sai_Percentile_Rank_and_Stanine: {
        url: "/admin-panel/conversion-matrix/sai-rank-stanine",
        buildParams: ({ page, perPage }) => ({
            page,
            per_page: perPage,
        }),
    },

    gradeRank: {
        url: "/admin-panel/conversion-matrix/grade-rank",
        buildParams: ({ selectedGroup, page, perPage }) => ({
            grade_rank: getGradeRankValue(selectedGroup),
            page,
            per_page: perPage,
        }),
    },

    verbal: {
        url: "/admin-panel/conversion-matrix/verbal",
        buildParams: ({ selectedGroup, page, perPage }) => ({
            verbal: getVerbalValue(selectedGroup),
            page,
            per_page: perPage,
        }),
    },
};

export function supportsRemoteCategory(category) {
    return Object.prototype.hasOwnProperty.call(CATEGORY_REQUEST_MAP, category);
}

export async function fetchConversionMatrixRows({
    category,
    selectedGroup,
    page = 1,
    perPage = 10,
}) {
    const config = CATEGORY_REQUEST_MAP[category];

    if (!config) {
        throw new Error(`Unsupported conversion matrix category: ${category}`);
    }

    const response = await axios.get(config.url, {
        params: config.buildParams({
            selectedGroup,
            page,
            perPage,
        }),
    });

    const payload = response.data ?? {};

    return {
        rows: payload.data ?? [],
        pagination: {
            current_page: payload.current_page ?? 1,
            per_page: payload.per_page ?? perPage,
            total: payload.total ?? 0,
            last_page: payload.last_page ?? 1,
        },
        raw: payload,
    };
}
