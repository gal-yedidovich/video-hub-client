export const SHOW_EPISODE_COUNT = {
	Office: [6, 18, 23, 14, 26, 26, 26, 24, 25],
	Friends: [24, 24, 25, 24, 24, 25, 24, 24, 24, 18],
} as const

export type Show = keyof typeof SHOW_EPISODE_COUNT