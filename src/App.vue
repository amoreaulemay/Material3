<script setup lang="ts">
import { material_theme } from './theme';
import { md, EdgeInsets, TextStyle, TextAlign, MainAxisAlignment, CrossAxisAlignment, Colors, Color, Icon } from './lib/lib';
import { CenterAligned, Container, Expanded, ListView, NavigationBar, Padding, Row, Scaffold, SizedBox, Text, IconView } from './components/Material/material';

const bgColor = Color.dynamic({
	light: Colors.grey.color100,
	dark: Colors.grey.color10,
});
const textStyle = TextStyle.copyWith({
	align: TextAlign.left,
});
</script>

<template>
	<Scaffold :theme="material_theme">
		<template #appBar="{ data }">
			<CenterAligned :theme="data">Thomas Soto Manager</CenterAligned>
		</template>

		<template #body>
			<Expanded>
				<Container>
					<Expanded>
						<ListView>
							<SizedBox :height="20" expanded />
							<Padding :padding="EdgeInsets.symmetric({ vertical: 10, horizontal: 20 })" v-for="n in 15" :key="n">
								<Row :main-axis-alignment="MainAxisAlignment.spaceBetween">
									<Text :text-style="textStyle" contrasting>Row {{ n }}</Text>
									<IconView :icon="new Icon({ name: 'chevron_right' })" />
								</Row>
							</Padding>
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
