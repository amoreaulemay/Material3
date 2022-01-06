<template>
	<div class="column flex flex-col h-full max-w-full overflow-hidden w-fit" :style="inline_css">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { MainAxisAlignment, CrossAxisAlignment, md } from '../../../lib/lib';

// Props
const props = defineProps({
	mainAxisAlignment: {
		type: String as PropType<MainAxisAlignment>,
		default: MainAxisAlignment.start,
	},
	crossAxisAlignment: {
		type: String as PropType<CrossAxisAlignment>,
		default: CrossAxisAlignment.center,
	},
});

// Computed Properties
const inline_css = computed(() => {
	return md.ref.alignment.generate_main_style(props.mainAxisAlignment) + md.ref.alignment.generate_cross_style(props.crossAxisAlignment);
});
</script>

<style scoped>
.column {
	justify-content: var(--main-axis-alignment);
	align-items: var(--cross-axis-alignment);
}
</style>
