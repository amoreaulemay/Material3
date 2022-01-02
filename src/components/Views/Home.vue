<script setup lang="ts">
import { Expanded, Container, ListView, SizedBox, ListViewItem, Row, Column, Text, IconView, Padding } from '../Material/material';
import { EdgeInsets, MainAxisAlignment, CrossAxisAlignment, TextStyle, TextAlign, Color, Colors, md, Icon } from '../../lib/lib';

const textStyle = TextStyle.copyWith({
	align: TextAlign.left,
});
const smallText = TextStyle.copyWith({
	align: TextAlign.left,
	color: Color.toDynamic(Colors.grey.color50),
	typescale: md.sys.typescale.body_small,
});

const chevron = new Icon({ name: 'chevron_right' });
</script>

<template>
	<Expanded>
		<Container>
			<Expanded>
				<ListView>
					<SizedBox :height="15" expanded />
					<ListViewItem :separator="n < 15" v-for="n in 15" :key="n">
						<Padding :padding="EdgeInsets.symmetric({ vertical: 10, horizontal: 20 })">
							<Row :main-axis-alignment="MainAxisAlignment.spaceBetween">
								<Column :main-axis-alignment="MainAxisAlignment.center" :cross-axis-alignment="CrossAxisAlignment.start">
									<Text :text-style="textStyle" contrasting>Row {{ n }}</Text>
									<Text :text-style="smallText">Row description.</Text>
								</Column>
								<IconView :icon="chevron" />
							</Row>
						</Padding>
					</ListViewItem>
					<SizedBox :height="6" expanded />
				</ListView>
			</Expanded>
		</Container>
	</Expanded>
</template>
