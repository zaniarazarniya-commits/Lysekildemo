/**
 * LYSEKIL DESIGN TOKENS — Bohuslänsk natur
 * Djupt hav, granit, sand, drivved, mossa.
 */

export const colors = {
    deepSea: "#1B4B66",
    seaBlue: "#2D6A8E",
    seaMist: "#4A8BAF",
    granite: "#6B6B6B",
    graniteLight: "#8A8A8A",
    rockDark: "#2C2C2C",
    shell: "#F7F5F2",
    sand: "#EDE8E0",
    sandWarm: "#E5DDD2",
    driftwood: "#C4B8A8",
    kelp: "#5A7D6B",
    kelpMuted: "#7A9B8A",
    rust: "#B8860B",
    rustMuted: "#C9A96E",
    white: "#FFFFFF",
    // Aliaser för bakåtkompatibilitet
    foamWhite: "#FFFFFF",
    shellWhite: "#F7F5F2",
    sandBeige: "#EDE8E0",
    graniteGrey: "#6B6B6B",
    kelpGreen: "#5A7D6B",
    sunsetAmber: "#B8860B",
    alertRed: "#C0392B",
} as const;

export const shadows = {
    sm: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
        elevation: 1,
    },
    md: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.06,
        shadowRadius: 12,
        elevation: 3,
    },
} as const;

export const radius = {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
} as const;

export const spacing = {
    xs: 4,
    sm: 8,
    md: 10,
    lg: 14,
    xl: 18,
    xxl: 22,
} as const;

export const typography = {
    h1: { fontSize: 26, fontWeight: "700" as const, letterSpacing: -0.3 },
    h2: { fontSize: 18, fontWeight: "700" as const, letterSpacing: -0.2 },
    h3: { fontSize: 15, fontWeight: "700" as const },
    body: { fontSize: 13, fontWeight: "400" as const, lineHeight: 19 },
    caption: { fontSize: 11, fontWeight: "600" as const, letterSpacing: 0.5 },
    label: { fontSize: 12, fontWeight: "600" as const },
} as const;
