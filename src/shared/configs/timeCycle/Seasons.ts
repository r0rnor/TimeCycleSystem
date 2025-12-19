export const SEASONS = ["Spring", "Summer", "Autumn", "Winter"] as const;
export type Season = (typeof SEASONS)[number];

export const START_SEASON = "Spring" as Season;

export const DAYS_PER_SEASON = 21;
