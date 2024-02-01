export const SHOW_EPISODE_COUNT = {
	Office: [6, 18, 23, 14, 26, 26, 26, 24, 25],
	Friends: [24, 24, 25, 24, 24, 25, 24, 24, 24, 18],
	FamilyGuy: [7, 21, 22, 30, 18, 12, 16, 21, 18, 23, 22, 21, 18, 20, 20, 20, 20, 20, 20, 20],
} as const

export type Show = keyof typeof SHOW_EPISODE_COUNT