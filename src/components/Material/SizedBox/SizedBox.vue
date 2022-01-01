<template>
	<div class="sized-box relative max-w-full max-h-full overflow-hidden" :class="grow ? 'flex-grow' : ''" :style="inline_css">
		<slot></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { md } from '../../../lib/lib';

export default defineComponent({
	name: 'SizedBox',
	props: {
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
	},
	computed: {
		cmp_height(): string {
			if (this.height < 0) {
				return '0';
			} else if (this.height == Number.POSITIVE_INFINITY) {
				return '100%';
			} else {
				return this.height + 'px';
			}
		},
		cmp_width(): string {
			if (this.width < 0) {
				return '0';
			} else if (this.width == Number.POSITIVE_INFINITY) {
				return '100%';
			} else {
				return this.width + 'px';
			}
		},
		grow(): boolean {
			return this.cmp_height === '100%' || this.cmp_width === '100%' || this.expanded;
		},
		css_vars(): md.ref.css_var {
			return {
				'--sized-box-height': this.cmp_height,
				'--sized-box-width': this.cmp_width,
			};
		},
		inline_css(): string {
			return md.ref.generate_style(this.css_vars);
		},
	},
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
