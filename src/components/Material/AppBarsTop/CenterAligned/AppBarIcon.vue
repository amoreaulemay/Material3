<template>
	<span :class="icon.css_class" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{{ icon.name }}</span>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Icon } from '../../../../lib/lib';

export default defineComponent({
	name: 'AppBarIcon',
	props: {
		icon: {
			type: Object as PropType<Icon>,
			required: true,
		},
	},
});
</script>
