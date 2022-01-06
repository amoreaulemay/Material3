<script setup lang="ts">
import { Container, Expanded, LVTextBuilder } from '../Material/material';
import { TextListObject } from '../../lib/lib';

let rows: TextListObject[] = [];
for (let i = 0; i < 30; i++) {
	rows.push({
		id: i,
		primaryText: `Row ${i + 1}`,
		secondaryText: `Row ${i + 1} description.`,
		destination: 'test',
	});
}
</script>

<script lang="ts">
import { defineComponent, inject } from 'vue';
import { MaterialTheme } from '../Material/MaterialTheme';

export default defineComponent({
	emits: ['scrolled'],
	methods: {
		scrolled(containerID: string) {
			this.$emit('scrolled', containerID);
		},
	},
});
</script>

<template>
	<Expanded>
		<Container>
			<Expanded>
				<LVTextBuilder separator :list="rows" @list-view-scrolling="scrolled" />
			</Expanded>
		</Container>
	</Expanded>
</template>
