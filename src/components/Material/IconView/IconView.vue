<template>
	<span :class="icon.css_class" :style="`font-size: ${size}px;` + inline_css" class="icon-view">{{ icon.name }}</span>
</template>

<script setup lang="ts">
import { computed, inject, PropType } from 'vue';
import { Icon, DynamicColor, md } from '../../../lib/lib';
import { MaterialTheme } from '../MaterialTheme';

// Theme
const theme = ((inject('theme') as MaterialTheme | undefined) ?? new MaterialTheme()).palette;

// Props
const props = defineProps({
	icon: {
		type: Object as PropType<Icon>,
		required: true,
	},
	size: {
		type: Number,
		default: 24,
	},
	color: {
		type: Object as PropType<DynamicColor>,
		required: false,
	},
});

// Computed Properties
const icon_color = computed(() => {
	if (typeof props.color !== 'undefined') {
		return props.color;
	} else {
		return theme?.colors.primary ?? md.sys.color.primary;
	}
});

const css_vars = computed<md.ref.css_var>(() => {
	return {
		'--icon-view-color-light': icon_color.value.light.hex,
		'--icon-view-color-dark': icon_color.value.dark.hex,
	};
});

const inline_css = computed(() => {
	return md.ref.generate_style(css_vars.value);
});
</script>

<style scoped>
.icon-view {
	color: var(--icon-view-color-light);
}

@media (prefers-color-scheme: dark) {
	.icon-view {
		color: var(--icon-view-color-dark);
	}
}
</style>
