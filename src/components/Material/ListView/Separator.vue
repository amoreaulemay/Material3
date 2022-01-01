<template>
	<Padding :padding="padding">
		<SizedBox expanded :height="height" :width="width" class="lv-separator">
			<Container :background="color" />
		</SizedBox>
	</Padding>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Colors, Color, DynamicColor, EdgeInsets, ListViewDirection } from '../../../lib/lib';
import SizedBox from '../SizedBox/SizedBox.vue';
import Container from '../Container/Container.vue';
import Expanded from '../Expanded/Expanded.vue';
import Padding from '../Padding/Padding.vue';

export default defineComponent({
	name: 'Separator',
	props: {
		color: {
			type: Object as PropType<DynamicColor>,
			default: Color.dynamic({
				light: Colors.grey.color40,
				dark: Colors.grey.color50,
			}),
		},
		direction: {
			type: Number as PropType<ListViewDirection>,
			default: ListViewDirection.column,
		},
	},
	components: {
		SizedBox,
		Container,
		Expanded,
		Padding,
	},
	computed: {
		height(): number {
			switch (this.direction) {
				case ListViewDirection.column:
					return 1;
				case ListViewDirection.row:
					return Number.POSITIVE_INFINITY;
			}
		},
		width(): number {
			switch (this.direction) {
				case ListViewDirection.column:
					return Number.POSITIVE_INFINITY;
				case ListViewDirection.row:
					return 1;
			}
		},
		padding(): EdgeInsets {
			switch (this.direction) {
				case ListViewDirection.column:
					return EdgeInsets.symmetric({ horizontal: 10, vertical: 5 });
				case ListViewDirection.row:
					return EdgeInsets.symmetric({ horizontal: 5, vertical: 10 });
			}
		},
	},
});
</script>

<style scoped>
.lv-separator {
	opacity: 0.35;
}

@media (prefers-color-scheme: dark) {
	.lv-separator {
		opacity: 0.25;
	}
}
</style>
