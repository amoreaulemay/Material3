<script setup lang="ts">
import { material_theme } from './theme';
import { md, EdgeInsets, TextStyle, TextAlign, MainAxisAlignment, CrossAxisAlignment, Colors, Color, Icon } from './lib/lib';
import { CenterAligned, Container, Expanded, ListView, NavigationBar, Padding, Row, Scaffold, SizedBox, Text, IconView, ListViewItem, Column, FABExpanded } from './components/Material/material';
import { ref } from '@vue/reactivity';

const bgColor = Color.dynamic({
	light: Colors.grey.color100,
	dark: Colors.grey.color10,
});
const textStyle = TextStyle.copyWith({
	align: TextAlign.left,
});
const smallText = TextStyle.copyWith({
	align: TextAlign.left,
	color: Color.toDynamic(Colors.grey.color50),
	typescale: md.sys.typescale.body_small,
});

const chevron = new Icon({ name: 'chevron_right' });

enum Views {
	home,
	preview,
	settings,
}

let activeView = ref(Views.home);

const add = new Icon({ name: 'add' });
const fab_text = 'Add Row';
function testFab() {
	alert('Fab was pressed!');
}
</script>

<template>
	<Scaffold :theme="material_theme">
		<template #appBar="{ data }">
			<CenterAligned :theme="data">Thomas Soto Manager</CenterAligned>
		</template>

		<template #fab="{ data }">
			<FABExpanded :icon="add" :text="fab_text" :theme="data" @fab-pressed="testFab" />
		</template>

		<template #body>
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

		<template #navigationBar="{ data }">
			<NavigationBar :theme="data" />
		</template>
	</Scaffold>
</template>

<style>
:root {
	--sat: env(safe-area-inset-top);
	--sar: env(safe-area-inset-right);
	--sab: env(safe-area-inset-bottom);
	--sal: env(safe-area-inset-left);
}

html,
body {
	height: 100%;
	overflow: hidden;
}

#app {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow: auto;
}

body {
	background: var(--bg-color-light);
	touch-action: pan-x pan-y;
}

@media (prefers-color-scheme: dark) {
	body {
		background: var(--bg-color-dark);
	}
}
</style>
