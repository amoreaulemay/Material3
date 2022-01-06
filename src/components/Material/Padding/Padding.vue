<template>
	<div class="padding max-h-full max-w-full" :style="padding.inline_css">
		<slot></slot>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { EdgeInsets } from '../../../lib/lib';

// Props
const props = defineProps({
	padding: {
		type: Object as PropType<EdgeInsets>,
		default: EdgeInsets.all(0),
	},
});
</script>

<style scoped>
.padding {
	padding-bottom: var(--padding-bottom);
	padding-left: var(--padding-left);
	padding-right: var(--padding-right);
	padding-top: var(--padding-top);
}
</style>
