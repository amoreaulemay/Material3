<template>
	<Padding :padding="dimensions.padding">
		<SizedBox expanded :height="dimensions.height" :width="dimensions.width" class="lv-separator">
			<Container :background="color" />
		</SizedBox>
	</Padding>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Colors, Color, DynamicColor, EdgeInsets, ListViewDirection } from '../../../lib/lib';
import SizedBox from '../SizedBox/SizedBox.vue';
import Container from '../Container/Container.vue';
import Padding from '../Padding/Padding.vue';

interface dimensions {
	height: number;
	width: number;
	padding: EdgeInsets;
}

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
		Padding,
	},
	computed: {
		dimensions(): dimensions {
			switch (this.direction) {
				case ListViewDirection.column:
					return {
						height: 1,
						width: Number.POSITIVE_INFINITY,
						padding: EdgeInsets.symmetric({ horizontal: 10, vertical: 5 }),
					};
				case ListViewDirection.row:
					return {
						height: Number.POSITIVE_INFINITY,
						width: 1,
						padding: EdgeInsets.symmetric({ horizontal: 5, vertical: 10 }),
					};
			}
		},
	},
});
</script>

<style scoped>
.lv-separator {
	opacity: 0.25;
}
</style>
