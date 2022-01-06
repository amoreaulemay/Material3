<template>
	<nav class="container fixed top-0 left-0 max-w-full flex items-center px-4 select-none" :style="material_theme.app_bar_theme.container_theme.inline_css" :id="containerID">
		<div class="shrink leading-icon relative" :style="material_theme.app_bar_theme.leading_navigation_icon_theme.inline_css">
			<AppBarIcon :icon="leading_icon" />
		</div>
		<div class="flex-auto h-full spacer"></div>
		<div class="flex-auto headline h-min text-center whitespace-nowrap" :style="material_theme.app_bar_theme.headline_theme.inline_css" ref="headline">
			<span id="headline_text" ref="headline_text" :style="`font-size: ${headline_font_size}rem`"><slot></slot></span>
		</div>
		<div class="flex-auto h-full spacer"></div>
		<div class="shrink trailing-icon relative" :style="material_theme.app_bar_theme.trailing_icon_theme.inline_css">
			<AppBarIcon :icon="trailing_icon" />
		</div>
	</nav>
</template>

<script setup lang="ts">
import { inject, computed, onMounted, onUnmounted } from 'vue';
import K from '../../../../lib/Constants';
import { MaterialTheme } from '../../MaterialTheme';
import AppBarIcon from './AppBarIcon.vue';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '../../../../lib/lib';

// Props
const props = defineProps({
	main_view_id: {
		type: String,
		required: false,
	},
});

// Theme
const material_theme = (inject('theme') as MaterialTheme | undefined) ?? new MaterialTheme();

// Computed Properties
const containerID = computed(() => {
	return uuidv4();
});

// Mutable Properties
let headline_font_size = material_theme.app_bar_theme.headline_theme.size * 0.0625;

// Methods
function scroll_elevation() {
	let scroll = 0;
	if (typeof props.main_view_id !== 'undefined') {
		scroll = document.getElementById(props.main_view_id)?.scrollTop ?? 0;
	} else {
		scroll = window.scrollY;
	}
	if (scroll === 0) {
		document.getElementById(containerID.value)?.classList.remove('on-scroll');
	} else {
		document.getElementById(containerID.value)?.classList.add('on-scroll');
	}
}

function correctTextFontSize() {
	let max_width = screen.width - K.cab.fixed_width_content;
	let elem = document.getElementById('headline_text')!;
	if (elem.offsetWidth < max_width) {
		headline_font_size = material_theme.app_bar_theme.headline_theme.size * 0.0625;
	}
	while (elem.offsetWidth > max_width) {
		headline_font_size -= 0.01;
		elem.style.fontSize = headline_font_size + 'rem';
	}
}

// Lifecycle hooks
onMounted(() => {
	correctTextFontSize();
	window.addEventListener('scroll', scroll_elevation);
	window.addEventListener('resize', correctTextFontSize);
});

onUnmounted(() => {
	window.removeEventListener('scroll', scroll_elevation);
	window.removeEventListener('resize', correctTextFontSize);
});

// Constants
const trailing_icon = new Icon({
	name: 'more_vert',
});

const leading_icon = new Icon({
	name: 'menu',
});
</script>

<style scoped>
.container {
	background: var(--ca-container-color-light);
	box-shadow: var(--ca-container-elevation-light);
	height: var(--ca-container-height);
	border-radius: var(--ca-container-shape);
	z-index: var(--ca-container-z-index);
}

.container.on-scroll {
	box-shadow: var(--ca-container-elevation-on-scroll-light) !important;
}

.headline {
	color: var(--ca-headline-color-light);
	font-family: var(--ca-headline-font);
	line-height: var(--ca-headline-line-height);
	font-size: var(--ca-headline-size);
	letter-spacing: var(--ca-headline-tracking);
	font-weight: var(--ca-headline-weight);
}

.leading-icon {
	color: var(--ca-leading-navigation-icon-color-light);
	min-width: var(--ca-leading-navigation-icon-touch-target-width);
	min-height: var(--ca-leading-navigation-icon-touch-target-height);
}

.trailing-icon {
	color: var(--ca-trailing-icon-color-light);
	min-width: var(--ca-trailing-icon-touch-target-width);
	min-height: var(--ca-trailing-icon-touch-target-height);
}

.spacer {
	min-width: var(--ca-container-padding-between-elements);
}
@media (prefers-color-scheme: dark) {
	.container {
		background: var(--ca-container-color-dark);
		box-shadow: var(--ca-container-elevation-dark);
	}

	.container.on-scroll {
		box-shadow: var(--ca-container-elevation-on-scroll-dark) !important;
	}

	.headline {
		color: var(--ca-headline-color-dark);
	}

	.leading-icon {
		color: var(--ca-leading-navigation-icon-color-dark);
	}

	.trailing-icon {
		color: var(--ca-trailing-icon-color-dark);
	}
}
</style>
