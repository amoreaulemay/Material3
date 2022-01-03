<template>
	<div class="scaffold h-full w-full">
		<slot name="appBar" :data="theme.app_bar_theme"></slot>

		<main class="body-container fixed top-0 bottom-0 left-0 right-0 overflow-hidden z-0" :style="bodyContainerInlineCss" :class="$slots.navigationBar ? 'btm-margin' : ''">
			<slot name="body"></slot>
		</main>

		<div class="fab-wrapper fixed top-0 left-0 right-0 bottom-0 overflow-hidden" :style="bodyContainerInlineCss" :class="$slots.navigationBar ? 'btm-margin' : ''">
			<Expanded>
				<div class="fab-container flex flex-col-reverse select-none justify-end items-end">
					<slot name="fab" :data="theme.fab_theme"></slot>
					<div class="flex-grow"></div>
				</div>
			</Expanded>
		</div>

		<slot name="navigationBar" :data="theme.navigation_bar_theme"></slot>
	</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { md } from '../../../lib/lib';
import { MaterialTheme, CATheme, NBTheme } from '../MaterialTheme';
import { Expanded } from '../material';

export default defineComponent({
	name: 'Scaffold',
	props: {
		theme: {
			type: Object as PropType<MaterialTheme>,
			default: new MaterialTheme(),
		},
	},
	computed: {
		bodyContainerInlineCss(): string {
			return md.ref.generate_style({
				'--body-container-margin-top': this.$slots.appBar ? CATheme.properties.container_height.rem.toString() + 'rem' : '0',
				'--nb-height': NBTheme.properties.container.height.toString(),
				'--nb-padding': NBTheme.properties.container.padding.bottom.toString(),
			});
		},
	},
	components: { Expanded },
});
</script>

<style scoped>
.body-container {
	margin-top: var(--body-container-margin-top);
}

.fab-wrapper {
	margin-top: var(--body-container-margin-top);
	pointer-events: none;
}

.btm-margin {
	margin-bottom: calc(var(--nb-height) + max(env(safe-area-inset-bottom), var(--nb-padding)));
}
</style>
