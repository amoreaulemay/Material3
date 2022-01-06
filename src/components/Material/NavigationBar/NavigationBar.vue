<template>
	<nav class="container fixed bottom-0 left-0 max-w-full flex items-center justify-center select-none landscape:sm:hidden landscape:lg:flex" :id="containerID" :style="theme.container_theme.inline_css">
		<NBSpacer />
		<NBDestination :theme="theme.destination_theme" v-for="destination in _destinations" :key="destination.id" :destination="destination" @destination-clicked="onDestinationClicked" />
	</nav>
</template>

<script setup lang="ts">
import { PropType, inject, computed, ref } from 'vue';
import { Views } from '../../Views/routes';
import { MaterialTheme } from '../MaterialTheme';
import { NBDestinationItem } from './NBDestinationItem';
import { v4 as uuidv4 } from 'uuid';
import NBSpacer from './NBSpacer.vue';
import NBDestination from './NBDestination.vue';

// Props
const props = defineProps({
	destinations: {
		type: Object as PropType<NBDestinationItem[]>,
		required: true,
	},
});

// Emits Registration
const emit = defineEmits<{
	(e: 'nb-navigation', view: Views): void;
}>();

// Theme
const theme = ((inject('theme') as MaterialTheme | undefined) ?? new MaterialTheme()).navigation_bar_theme;

// Computed Properties
const containerID = computed(() => {
	return uuidv4();
});

// Mutable Properties
let _destinations = ref(props.destinations);

// Methods
function onDestinationClicked(destination: NBDestinationItem) {
	_destinations.value.forEach((x) => {
		if (x.id !== destination.id) {
			x.setInactive();
		} else {
			x.setActive();
		}
	});

	emit('nb-navigation', destination.linked_view);
}
</script>

<style scoped>
.container {
	background: var(--nb-container-color-light);
	box-shadow: var(--nb-container-elevation-light);
	height: calc(var(--nb-container-height) + max(env(safe-area-inset-bottom), var(--nb-container-padding-bottom)));
	border-radius: var(--nb-container-shape);
	z-index: var(--nb-container-z-index);
	padding-top: var(--nb-container-padding-top);
	padding-bottom: max(env(safe-area-inset-bottom), var(--nb-container-padding-bottom));
}

@media (prefers-color-scheme: dark) {
	.container {
		background: var(--nb-container-color-dark);
	}
}
</style>
