<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { material_theme } from './theme';
import { Icon, IconProperty } from './lib/lib';
import { CenterAligned, NavigationBar, Scaffold, FABExpanded } from './components/Material/material';
import { Views, destinations, Home, Preview, Settings } from './components/Views/routes';
import { FABIcon, collapse } from './components/Material/FloatingActionButton/FABIcon';
import { Ref } from 'vue';

let activeView = ref(Views.home);

function activeViewSwitcher(new_view: Views) {
	activeView.value = new_view;
}

const home_fab: FABIcon = {
	icon: new Icon({ name: 'add' }),
	text: 'Add Row',
	callback: () => {
		alert('FAB was pressed!');
	},
	collapsed: ref(false),
	collapsed_cb: (containerID?: string) => {
		collapse(containerID, home_fab.collapsed);
	},
};

const preview_fab: FABIcon = {
	icon: new Icon({
		name: 'publish',
		property: IconProperty.outlined,
	}),
	text: 'Publish',
	callback: () => {
		alert('This will be published!');
	},
	collapsed: ref(false),
	collapsed_cb: (containerID?: string) => {
		collapse(containerID, preview_fab.collapsed);
	},
};
</script>

<template>
	<Scaffold :theme="material_theme">
		<template #appBar="{ data }">
			<CenterAligned :theme="data">Thomas Soto Manager</CenterAligned>
		</template>

		<template #fab="{ data }">
			<FABExpanded :icon="home_fab.icon" :text="home_fab.text" :theme="data" @fab-pressed="home_fab.callback" v-if="activeView == Views.home" :collapsed="home_fab.collapsed.value" />
			<FABExpanded :icon="preview_fab.icon" :text="preview_fab.text" :theme="data" @fab-pressed="preview_fab.callback" v-else-if="activeView == Views.preview" />
		</template>

		<template #body>
			<Home v-if="activeView == Views.home" @scrolled="home_fab.collapsed_cb" />
			<Preview v-else-if="activeView == Views.preview" />
			<Settings v-else-if="activeView == Views.settings" />
		</template>

		<template #navigationBar="{ data }">
			<NavigationBar :theme="data" :destinations="destinations" @nb-navigation="activeViewSwitcher" />
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
