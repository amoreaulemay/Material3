<template>
	<div class="list-view-item flex flex-col">
		<slot></slot>
		<Separator :color="color" :direction="direction" v-if="separator" />
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { ListViewDirection, DynamicColor } from '../../../lib/lib';
import Separator from '../ListView/Separator.vue';

// Props
const props = defineProps({
	separator: {
		type: Boolean,
		default: false,
	},
	direction: {
		type: Number as PropType<ListViewDirection>,
		default: ListViewDirection.column,
	},
	color: {
		type: Object as PropType<DynamicColor>,
		required: false,
	},
});
</script>
