<template>
	<div class="sized-box relative max-w-full max-h-full overflow-hidden" :class="grow ? 'flex-grow' : ''" :style="inline_css">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { md } from '../../../lib/lib';

// Props
const props = defineProps({
	height: {
		type: Number,
		default: 0,
	},
	width: {
		type: Number,
		default: 0,
	},
	expanded: {
		type: Boolean,
		default: false,
	},
});

// Computed Properties
const cmp_height = computed(() => {
	if (props.height < 0) {
		return '0';
	} else if (props.height == Number.POSITIVE_INFINITY) {
		return '100%';
	} else {
		return props.height + 'px';
	}
});

const cmp_width = computed(() => {
	if (props.width < 0) {
		return '0';
	} else if (props.width == Number.POSITIVE_INFINITY) {
		return '100%';
	} else {
		return props.width + 'px';
	}
});

const grow = computed(() => {
	return cmp_height.value === '100%' || cmp_width.value === '100%' || props.expanded;
});

const css_vars = computed<md.ref.css_var>(() => {
	return {
		'--sized-box-height': cmp_height.value,
		'--sized-box-width': cmp_width.value,
	};
});

const inline_css = computed(() => {
	return md.ref.generate_style(css_vars.value);
});
</script>

<style scoped>
.sized-box {
	height: var(--sized-box-height);
	width: var(--sized-box-width);
	min-width: var(--sized-box-width);
	max-width: var(--sized-box-width);
	min-height: var(--sized-box-height);
	max-height: var(--sized-box-height);
}
</style>
