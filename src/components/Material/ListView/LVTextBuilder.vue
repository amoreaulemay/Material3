<template>
	<ListView @scroll="scrolling" :id="elementID">
		<SizedBox :height="15" expanded />
		<ListViewItem v-for="element in list" :key="element.id" :separator="shouldDisplaySeparator(element)">
			<Padding :padding="listPadding" class="min-h-[48px]">
				<Row :main-axis-alignment="mainAxisAlignment.spaceBetween">
					<Column :main-axis-alignment="mainAxisAlignment.center" :cross-axis-alignment="crossAxisAlignment.start">
						<Text :text-style="primaryText" contrasting>{{ element.primaryText }}</Text>
						<Text :text-style="secondaryText" v-if="shouldDisplaySecondary(element)"> {{ element.secondaryText }}</Text>
					</Column>
					<IconView :icon="chevron" v-if="shouldDisplayChevron(element)" />
				</Row>
			</Padding>
		</ListViewItem>
		<SizedBox :height="6" expanded />
	</ListView>
</template>

<script setup lang="ts">
const primaryText = TextStyle.copyWith({
	align: TextAlign.left,
});

const secondaryText = TextStyle.copyWith({
	align: TextAlign.left,
	color: Color.toDynamic(Colors.grey.color50),
	typescale: md.sys.typescale.body_small,
});
</script>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Color, Colors, CrossAxisAlignment, EdgeInsets, Icon, MainAxisAlignment, md, TextAlign, TextListObject, TextStyle } from '../../../lib/lib';
import ListView from './ListView.vue';
import SizedBox from '../SizedBox/SizedBox.vue';
import ListViewItem from '../ListViewItem/ListViewItem.vue';
import Padding from '../Padding/Padding.vue';
import Row from '../Row/Row.vue';
import Column from '../Column/Column.vue';
import Text from '../Text/Text.vue';
import IconView from '../IconView/IconView.vue';
import { v4 } from 'uuid';

export default defineComponent({
	components: { ListView, SizedBox, ListViewItem, Padding, Row, Column, Text, IconView },
	name: 'TextListViewBuilder',
	props: {
		separator: {
			type: Boolean,
			default: false,
		},
		list: {
			type: Object as PropType<TextListObject[]>,
			required: true,
		},
	},
	computed: {
		lastID(): string | number {
			return this.list[this.list.length - 1].id;
		},
		elementID(): string {
			return v4();
		},
	},
	methods: {
		shouldDisplaySeparator(element: TextListObject): boolean {
			return this.separator ? element.id != this.lastID : false;
		},
		shouldDisplayChevron(element: TextListObject): boolean {
			return typeof element.destination !== 'undefined';
		},
		shouldDisplaySecondary(element: TextListObject): boolean {
			return typeof element.secondaryText !== 'undefined';
		},
		scrolling() {
			this.$emit('list-view-scrolling', this.elementID);
		},
	},
	data() {
		return {
			chevron: new Icon({ name: 'chevron_right' }),
			listPadding: EdgeInsets.symmetric({ vertical: 10, horizontal: 20 }),
			mainAxisAlignment: MainAxisAlignment,
			crossAxisAlignment: CrossAxisAlignment,
		};
	},
	emits: ['list-view-scrolling'],
});
</script>
