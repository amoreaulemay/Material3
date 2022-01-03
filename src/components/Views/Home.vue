<script setup lang="ts">
import { Column, Container, Expanded, IconView, ListView, ListViewItem, Padding, Row, SizedBox, Text } from '../Material/material';
import { Color, Colors, CrossAxisAlignment, EdgeInsets, Icon, MainAxisAlignment, md, TextAlign, TextListObject, TextStyle } from '../../lib/lib';
import LVTextBuilder from '../Material/ListView/LVTextBuilder.vue';
import { v4 } from 'uuid';

const textStyle = TextStyle.copyWith({
	align: TextAlign.left,
});
const smallText = TextStyle.copyWith({
	align: TextAlign.left,
	color: Color.toDynamic(Colors.grey.color50),
	typescale: md.sys.typescale.body_small,
});

let rows: TextListObject[] = [];
for (let i = 0; i < 30; i++) {
	rows.push({
		id: i,
		primaryText: `Row ${i + 1}`,
		secondaryText: `Row ${i + 1} description.`,
		destination: 'test',
	});
}

rows.push({
	id: v4(),
	primaryText: 'No Destination',
	secondaryText: 'This has no destination',
});

rows.push({
	id: v4(),
	primaryText: 'No Secondary',
	destination: 'test',
});

rows.push({
	id: v4(),
	primaryText: 'No Secondary & No Dest',
});

const chevron = new Icon({ name: 'chevron_right' });
</script>

<script lang="ts">
import { defineComponent } from 'vue';

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
