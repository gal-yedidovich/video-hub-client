<script lang="ts" setup>
import ShowPlayer from '@/components/ShowPlayer.vue'

defineProps<{ show: string }>()
</script>

<template>
	<main>
		<ShowPlayer :show="show"/>
	</main>
</template>

<style scoped>
main {
	position: fixed;
	width: 100vw;
	height: 100vh;
}
</style>
