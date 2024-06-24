<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { type Show, SHOW_EPISODE_COUNT } from '@/types/episodes'
import { useDebounceFn, useEventListener } from '@vueuse/core'

type Episode = { episode: number, season: number }
type EpisodeTime = Episode & { time: number }

const BASE_URL = import.meta.env.VITE_SERVER_URL

const props = defineProps<{ show: Show }>()
const router = useRouter()
const ALL_SEASONS: readonly number[] = SHOW_EPISODE_COUNT[props.show]

const videoPlayer = ref<HTMLVideoElement>()
const episodesDialog = ref<HTMLDialogElement>()
const currentEpisode = ref<EpisodeTime>({ episode: -1, season: -1, time: -1 })
const seasonsCollapse = ref<boolean[]>(Array(ALL_SEASONS.length).fill(false))
const showingOverlay = ref(true)
let intervalId: number | undefined
const hideOverlayDebounced = useDebounceFn(() => {
	showingOverlay.value = false
}, 2500)

useEventListener(document, 'keydown', event => {
	if (event.key === '39' && event.metaKey) {
		requestNextEpisode()
	}
})

function showOverlay() {
	showingOverlay.value = true
	hideOverlayDebounced()
}

async function fetchCurrentEpisode(): Promise<void> {
	try {
		const url = `${BASE_URL}/api/currentEpisode?show=${props.show}`
		const response = await fetch(url)
		const { season, episode, time } = await response.json() as EpisodeTime
		currentEpisode.value = { season, episode, time }
	} catch (error) {
		console.error(error)
	}
}

async function requestNextEpisode(): Promise<void> {
	const { season, episode } = currentEpisode.value
	const query = `show=${props.show}&season=${season}&episode=${episode}`
	const nextEpisodeResponse = await fetch(`${BASE_URL}/api/nextEpisode?${query}`)
	const nextEpisode: Episode = await nextEpisodeResponse.json()

	await changeEpisode(nextEpisode)
}

function saveCurrentEpisodeTime(episode: EpisodeTime) {
	fetch(`${BASE_URL}/api/currentEpisode`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			show: props.show,
			season: episode.season,
			episode: episode.episode,
			time: episode.time,
		}),
	})
}

function onShowEpisodes(): void {
	episodesDialog.value?.showModal()
	videoPlayer.value?.pause()
}

async function changeEpisode(episode: Episode): Promise<void> {
	episodesDialog.value?.close()
	currentEpisode.value = { ...episode, time: 0 }
	videoPlayer.value?.load()
	await videoPlayer.value?.play()
}

onMounted(() => {
	fetchAndPlay()
	showOverlay()
	startSavingProgress()
})

async function fetchAndPlay() {
	await fetchCurrentEpisode()

	if (videoPlayer.value) {
		videoPlayer.value.currentTime = currentEpisode.value.time
		await videoPlayer.value?.play()
	}
}

function startSavingProgress() {
	intervalId = setInterval(async () => {
		if ((videoPlayer.value?.readyState ?? -1) <= 2) {
			return
		}
		if (videoPlayer.value?.paused) {
			return
		}
		const { season, episode } = currentEpisode.value
		const time = videoPlayer.value!.currentTime
		console.log('saving progress', { season, episode, time })
		saveCurrentEpisodeTime({ season, episode, time })
	}, 5000)
}

onUnmounted(() => {
	if (intervalId) {
		clearInterval(intervalId)
		intervalId = undefined
	}
})
</script>

<template>
	<div
		@mouseleave="showingOverlay = false">
		<div
			class="player"
			@mousemove="showOverlay">
			<video
				v-if="currentEpisode.season > -1"
				ref="videoPlayer"
				autofocus
				controls
				@ended="requestNextEpisode">
				<source :src="`${BASE_URL}/api/episode/${show}/s${currentEpisode.season}/e${currentEpisode.episode}`"/>
			</video>
		</div>

		<Transition name="overlay">
			<div v-show="showingOverlay">
				<div class="top-left menu">
					<div class="btn" @click="router.back()">← Back</div>
					<div>Season {{ currentEpisode.season }}, episode {{ currentEpisode.episode }}</div>
					<div class="btn" @click="onShowEpisodes">Episodes</div>
				</div>

				<div
					class="next nav btn"
					@click.stop="requestNextEpisode">
					→
				</div>
			</div>
		</Transition>

		<dialog ref="episodesDialog" class="episodesDialog">
			<p>All {{ show }} episodes:</p>

			<ol>
				<li
					v-for="(episodeCount, seasonIndex) in ALL_SEASONS"
					:key="seasonIndex"
					class="btn">
				<span
					@click="() => seasonsCollapse[seasonIndex] = !seasonsCollapse[seasonIndex]">
					Season {{ seasonIndex + 1 }}
				</span>
					<Transition name="season-section">
						<ol v-show="seasonsCollapse[seasonIndex]">
							<li
								v-for="(_, episodeIndex) in Array(episodeCount)"
								:key="episodeIndex"
								class="btn"
								@click="() => changeEpisode({ season: seasonIndex + 1, episode: episodeIndex + 1 })">
								Episode {{ episodeIndex + 1 }}
							</li>
						</ol>
					</Transition>
				</li>
			</ol>

			<button autofocus @click="episodesDialog?.close()">Close</button>
		</dialog>
	</div>
</template>

<style scoped>
.player {
	position: fixed;
	width: 100vw;
	height: 100vh;
}

video {
	width: 100%;
	height: 100%;
	outline: none;
}

.top-left.menu {
	position: fixed;
	top: 1em;
	left: 1em;
	display: flex;
	flex-direction: column;
}

.episodesDialog {
	background: #333;
	color: white;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	padding: 1em;
	max-height: 80vh;
	min-height: 200px;
	width: 300px;
}

.episodesDialog::backdrop {
	background: rgba(0, 0, 0, 0.8);
}

.btn {
	cursor: pointer;
}

.nav.btn {
	position: fixed;
	top: 50%;
	padding: 1em;
	transform: translateY(-50%);
	font-size: 3em;
	user-select: none;

	&.next {
		right: 0;
	}
}

/*noinspection CssUnusedSymbol*/
.season-section-enter-active,
.season-section-leave-active {
	transition: opacity 0.15s ease;
}

/*noinspection CssUnusedSymbol*/
.season-section-enter-from,
.season-section-leave-to {
	opacity: 0;
}

/*noinspection CssUnusedSymbol*/
.overlay-enter-active {
	transition: opacity 0.14s ease;
}

/*noinspection CssUnusedSymbol*/
.overlay-leave-active {
	transition: opacity 0.5s ease;
}

/*noinspection CssUnusedSymbol*/
.overlay-enter-from,
.overlay-leave-to {
	opacity: 0;
}
</style>
