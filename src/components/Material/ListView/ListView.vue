<template>
	<div class="list-view flex overscroll-contain select-none" :class="inline_class">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { ListViewDirection } from '../../../lib/lib';

// Props
const props = defineProps({
	direction: {
		type: Number as PropType<ListViewDirection>,
		default: ListViewDirection.column,
	},
});

// Computed Properties
const inline_class = computed(() => {
	return props.direction == ListViewDirection.column ? 'column' : 'row';
});
</script>

<style scoped>
.list-view.column {
	flex-direction: column;
	height: 100%;
	max-width: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	width: fit-content;
}

.list-view.row {
	flex-direction: row;
	width: 100%;
	max-height: 100%;
	overflow-y: hidden;
	overflow-x: auto;
	height: fit-content;
}
</style>
