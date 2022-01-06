<template>
	<p class="text" :style="_textStyle.inline_css" :id="id"><slot></slot></p>
</template>

<script setup lang="ts">
import { computed, inject, PropType } from 'vue';
import { TextStyle, Color, Colors } from '../../../lib/lib';
import { v4 as uuid4 } from 'uuid';
import { MaterialTheme } from '../MaterialTheme';

// Props
const props = defineProps({
	textStyle: {
		type: Object as PropType<TextStyle>,
		default: new TextStyle(),
	},
	contrasting: {
		type: Boolean,
		default: false,
	},
});

// Theme
const theme = ((inject('theme') as MaterialTheme | undefined) ?? new MaterialTheme()).body_contrasting_color;

// Computed Properties
const id = computed(() => {
	return uuid4();
});

// Mutable Properties
let _textStyle = props.contrasting ? contrastingColors() : props.textStyle;

// Method
function contrastingColors(): TextStyle {
	let curr_el = document.getElementById(id.value);
	let par_el = curr_el?.parentElement;

	if (typeof par_el !== 'undefined' && par_el !== null) {
		let inline_css = par_el.style.cssText.split('; ');
		let light_var = inline_css.find((style) => style.includes('--container-contrasting-color-light'));
		let dark_var = inline_css.find((style) => style.includes('--container-contrasting-color-dark'));

		let light_value = light_var?.slice(light_var.indexOf(':') + 1).replaceAll(';', '');
		let dark_value = dark_var?.slice(dark_var.indexOf(':') + 1).replaceAll(';', '');

		if (typeof light_value !== 'undefined' && typeof dark_value !== 'undefined') {
			if (light_value == 'none' || dark_value == 'none') {
				return props.textStyle;
			} else {
				light_value = light_value.replaceAll('#', '');
				dark_value = dark_value.replaceAll('#', '');
				let color = Colors.dynamic.pure_black;
				try {
					color = Color.dynamic({
						light: Color.fromHex(light_value),
						dark: Color.fromHex(dark_value),
					});
				} catch (err) {
					console.error(err);
				}

				return TextStyle.copyWith({
					color: color,
					align: props.textStyle.align,
					typescale: props.textStyle.typescale,
				});
			}
		} else {
			return TextStyle.copyWith({
				color: theme,
				align: props.textStyle.align,
				typescale: props.textStyle.typescale,
			});
		}
	} else {
		return TextStyle.copyWith({
			color: theme,
			align: props.textStyle.align,
			typescale: props.textStyle.typescale,
		});
	}
}
</script>

<style scoped>
.text {
	/* Color */
	color: var(--text-style-color-light);

	/* Align */
	text-align: var(--text-style-align);

	/* Typescale */
	font-family: var(--text-style-font);
	line-height: var(--text-style-line-height);
	font-size: var(--text-style-size);
	letter-spacing: var(--text-style-tracking);
	font-weight: var(--text-style-weight);
}

@media (prefers-color-scheme: dark) {
	.text {
		color: var(--text-style-color-dark);
	}
}
</style>
