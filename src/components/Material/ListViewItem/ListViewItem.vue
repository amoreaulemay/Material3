<template>
	<div class="list-view-item flex flex-col">
		<slot></slot>
		<Separator :color="color" :direction="direction" v-if="separator" />
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ListViewDirection, DynamicColor } from '../../../lib/lib';
import Separator from '../ListView/Separator.vue';

export default defineComponent({
	name: 'ListViewItem',
	props: {
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
	},
	components: { Separator },
});
</script>
