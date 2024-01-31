<script lang="ts" setup>
defineProps<{ show: string, thumbnail: string }>()
</script>

<template>
	<RouterLink :to="`/player/${show}`">
		<div class="show-item">
			<span>{{ show }}</span>
			<img v-if="thumbnail" :src="thumbnail" alt="thumbnail">
		</div>
	</RouterLink>
</template>

<style scoped>
.show-item {
	--size: 350px;
	width: var(--size);
	height: var(--size);
	display: flex;
	flex-direction: column;
	background: #333;
	border-radius: 1em;
}

span {
	font-size: 2em;
}

img {
	flex: 1;
	object-fit: contain;
}
</style>
