<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { material_theme } from './theme';
import { Icon } from './lib/lib';
import { CenterAligned, NavigationBar, Scaffold, FABExpanded } from './components/Material/material';
import { Views, destinations, Home, Preview, Settings } from './components/Views/routes';
import { collapse, FABModel } from './components/Material/FloatingActionButton/FABModel';

let activeView = ref(Views.home);

function activeViewSwitcher(new_view: Views) {
	activeView.value = new_view;
	collapsed.value = false;
}

const fab_home = FABModel.new({
	text: 'Add Row',
	icon: new Icon({ name: 'add' }),
	callback: () => {
		alert('FAB was pressed!');
	},
});

const fab_preview = FABModel.new({
	text: 'Publish',
	icon: new Icon({ name: 'publish' }),
	callback: () => {
		alert('This will be published!');
	},
});

let collapsed = ref(false);

function fab_collapse(containerID?: string) {
	collapse(containerID, collapsed);
}
</script>

<template>
	<Scaffold :theme="material_theme">
		<template #appBar>
			<CenterAligned>Thomas Soto Manager</CenterAligned>
		</template>

		<template #fab>
			<FABExpanded v-if="activeView == Views.home" :model="fab_home" :collapsed="collapsed" />
			<FABExpanded v-else-if="activeView == Views.preview" :model="fab_preview" :collapsed="collapsed" />
		</template>

		<template #body>
			<Home v-if="activeView == Views.home" @scrolled="fab_collapse" />
			<Preview v-else-if="activeView == Views.preview" />
			<Settings v-else-if="activeView == Views.settings" />
		</template>

		<template #navigationBar>
			<NavigationBar :destinations="destinations" @nb-navigation="activeViewSwitcher" />
		</template>
	</Scaffold>
</template>

<style>
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
