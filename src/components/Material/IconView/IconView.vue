<template>
	<span :class="icon.css_class" :style="`font-size: ${size}px;` + inline_css" class="icon-view">{{ icon.name }}</span>
</template>

<script lang="ts">
/// <reference path="../../../global.d.ts" />
import { defineComponent, PropType } from 'vue';
import { Icon, DynamicColor, Color, Colors, md } from '../../../lib/lib';

export default defineComponent({
	name: 'IconView',
	props: {
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
			default: window.__ENV_THEME__?.palette?.colors.primary ?? md.sys.color.primary,
		},
	},
	computed: {
		css_vars(): md.ref.css_var {
			return {
				'--icon-view-color-light': this.color.light.hex,
				'--icon-view-color-dark': this.color.dark.hex,
			};
		},
		inline_css(): string {
			return md.ref.generate_style(this.css_vars);
		},
	},
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
