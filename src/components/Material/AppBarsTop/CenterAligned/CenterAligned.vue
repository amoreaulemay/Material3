<template>
	<nav class="container fixed top-0 left-0 max-w-full flex items-center px-4 select-none" :style="theme.container_theme.inline_css" :id="containerID">
		<div class="shrink leading-icon relative" :style="theme.leading_navigation_icon_theme.inline_css">
			<AppBarIcon :icon="leading_icon" />
		</div>
		<div class="flex-auto h-full spacer"></div>
		<div class="flex-auto headline h-min text-center whitespace-nowrap" :style="theme.headline_theme.inline_css" ref="headline">
			<span id="headline_text" ref="headline_text" :style="`font-size: ${headline_font_size}rem`"><slot></slot></span>
		</div>
		<div class="flex-auto h-full spacer"></div>
		<div class="shrink trailing-icon relative" :style="theme.trailing_icon_theme.inline_css">
			<AppBarIcon :icon="trailing_icon" />
		</div>
	</nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { CenterAlignedTheme } from './CenterAlignedTheme';
// @ts-ignore: Unreachable code error
import { v4 as uuidv4 } from 'uuid';
import AppBarIcon from './AppBarIcon.vue';
import { Icon } from '../../../../lib/Icon';

export default defineComponent({
	name: 'CenterAligned',
	props: {
		theme: {
			type: Object as PropType<CenterAlignedTheme>,
			default: new CenterAlignedTheme(),
		},
		main_view_id: {
			type: String,
			required: false,
		},
	},
	data() {
		return {
			headline_font_size: this.theme.headline_theme.size * 0.0625,
			trailing_icon: new Icon({
				name: 'more_vert',
			}),
			leading_icon: new Icon({
				name: 'menu',
			}),
		};
	},
	computed: {
		containerID(): string {
			return uuidv4();
		},
	},
	mounted() {
		this.correctTextFontSize();
		window.addEventListener('scroll', this.onScroll);
		window.addEventListener('resize', this.correctTextFontSize);
	},
	unmounted() {
		window.removeEventListener('scroll', this.onScroll);
		window.removeEventListener('resize', this.correctTextFontSize);
	},
	methods: {
		onScroll() {
			let scroll = 0;
			if (typeof this.main_view_id !== 'undefined') {
				scroll = document.getElementById(this.main_view_id)?.scrollTop ?? 0;
			} else {
				scroll = window.scrollY;
			}
			if (scroll === 0) {
				document.getElementById(this.containerID)?.classList.remove('on-scroll');
			} else {
				document.getElementById(this.containerID)?.classList.add('on-scroll');
			}
		},
		correctTextFontSize() {
			// The 176 comes from 2 elements of 48px width (96px), two side paddings of 16px (32px) and a minimum spacing of 24px between elements * 2 (48px) = 176px.
			let max_width = screen.width - 176;
			let elem = document.getElementById('headline_text')!;
			if (elem.offsetWidth < max_width) {
				this.headline_font_size = this.theme.headline_theme.size * 0.0625;
			}
			while (elem.offsetWidth > max_width) {
				this.headline_font_size -= 0.01;
				elem.style.fontSize = this.headline_font_size + 'rem';
			}
		},
	},
	components: { AppBarIcon },
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
