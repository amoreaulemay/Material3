<template>
	<div class="material-container relative h-fit w-fit" :style="inline_css" :id="id">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { Color, DynamicColor, EdgeInsets, md } from '../../../lib/lib';
import { v4 as uuid4 } from 'uuid';

// Custom Type Definition
type Background = Color | DynamicColor;

// Props
const props = defineProps({
	background: {
		type: Object as PropType<Background>,
		required: false,
	},
	padding: {
		type: Object as PropType<EdgeInsets>,
		default: EdgeInsets.all(0),
	},
	margin: {
		type: Object as PropType<EdgeInsets>,
		default: EdgeInsets.margin.all(0),
	},
});

// Computed Properties
const css_vars = computed<md.ref.css_var>(() => {
	let light = '';
	let dark = '';

	if (typeof props.background === 'undefined') {
		light = 'none';
		dark = 'none';
	} else {
		if (props.background instanceof Color) {
			light = props.background.hex;
			dark = props.background.hex;
		} else if (props.background instanceof DynamicColor) {
			light = props.background.light.hex;
			dark = props.background.dark.hex;
		} else {
			throw new Error('Invalid type.');
		}
	}

	return {
		'--material-container-background-light': light,
		'--material-container-background-dark': dark,
	};
});

const background_inline_css = computed(() => {
	return md.ref.generate_style(css_vars.value);
});

const contrastingColor = computed<DynamicColor | undefined>(() => {
	if (typeof props.background === 'undefined') {
		return undefined;
	} else {
		if (props.background instanceof Color) {
			return Color.toDynamic(Color.getContrastingShade(props.background));
		} else if (props.background instanceof DynamicColor) {
			return Color.dynamic({
				light: Color.getContrastingShade(props.background.light),
				dark: Color.getContrastingShade(props.background.dark),
			});
		}
	}
});

const inline_contrasting_colors = computed(() => {
	return md.ref.generate_style({
		'--container-contrasting-color-light': contrastingColor.value?.light.hex ?? 'none',
		'--container-contrasting-color-dark': contrastingColor.value?.dark.hex ?? 'none',
	});
});

const inline_css = computed(() => {
	return background_inline_css.value + props.padding.inline_css + props.margin.inline_css.replaceAll('padding', 'margin') + inline_contrasting_colors.value;
});

const id = computed(() => {
	return uuid4();
});
</script>

<style scoped>
.material-container:empty {
	height: 100%;
	width: 100%;
}

.material-container {
	background: var(--material-container-background-light);
	padding-bottom: var(--padding-bottom);
	padding-left: var(--padding-left);
	padding-right: var(--padding-right);
	padding-top: var(--padding-top);
	margin-bottom: var(--margin-bottom);
	margin-left: var(--margin-left);
	margin-right: var(--margin-right);
	margin-top: var(--margin-top);
}

@media (prefers-color-scheme: dark) {
	.material-container {
		background: var(--material-container-background-dark);
	}
}
</style>
