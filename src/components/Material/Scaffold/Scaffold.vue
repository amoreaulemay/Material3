<template>
	<div class="scaffold h-full w-full">
		<slot name="appBar"></slot>

		<main class="body-container fixed top-0 bottom-0 left-0 right-0 overflow-hidden z-0 btm-margin-no-nb" :style="bodyContainerInlineCss" :class="$slots.navigationBar ? 'btm-margin' : ''">
			<slot name="body"></slot>
		</main>

		<div class="fab-wrapper fixed top-0 left-0 right-0 bottom-0 overflow-hidden btm-margin-no-nb" :style="bodyContainerInlineCss" :class="$slots.navigationBar ? 'btm-margin' : ''">
			<Expanded>
				<div class="fab-container flex flex-col-reverse select-none justify-end items-end">
					<slot name="fab"></slot>
					<div class="flex-grow"></div>
				</div>
			</Expanded>
		</div>

		<slot name="navigationBar" :data="theme.navigation_bar_theme"></slot>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, provide, useSlots } from 'vue';
import { md } from '../../../lib/lib';
import { MaterialTheme, CATheme, NBTheme } from '../MaterialTheme';
import { Expanded } from '../material';

const slots = useSlots();

// Props
const props = defineProps({
	theme: {
		type: Object as PropType<MaterialTheme>,
		default: new MaterialTheme(),
	},
});

// Theme provider
provide('theme', props.theme);

// Computed Properties
const bodyContainerInlineCss = computed(() => {
	return md.ref.generate_style({
		'--body-container-margin-top': slots.appBar ? CATheme.properties.container_height.rem.toString() + 'rem' : '0',
		'--nb-height': NBTheme.properties.container.height.toString(),
		'--nb-padding': NBTheme.properties.container.padding.bottom.toString(),
	});
});
</script>

<style scoped>
.body-container {
	margin-top: var(--body-container-margin-top);
	margin-left: env(safe-area-inset-left);
	margin-right: env(safe-area-inset-right);
}

.fab-wrapper {
	margin-top: var(--body-container-margin-top);
	margin-left: env(safe-area-inset-left);
	margin-right: env(safe-area-inset-right);
	pointer-events: none;
}

.btm-margin {
	margin-bottom: calc(var(--nb-height) + max(env(safe-area-inset-bottom), var(--nb-padding)));
}

@media (orientation: landscape) and (min-width: 640px) and (max-width: 1023px) {
	.btm-margin-no-nb {
		margin-bottom: env(safe-area-inset-bottom) !important;
	}
}
</style>
