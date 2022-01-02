<template>
	<div class="scaffold h-full w-full">
		<slot name="appBar" :data="theme.app_bar_theme"></slot>

		<main class="body-container fixed top-0 bottom-0 left-0 right-0 overflow-hidden z-0" :style="bodyContainerInlineCss">
			<slot name="body"></slot>
		</main>

		<div class="fab-wrapper fixed top-0 left-0 right-0 bottom-0 overflow-hidden" :style="bodyContainerInlineCss">
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
import safeAreaInsets from 'safe-area-insets';

const btmInset = safeAreaInsets.support ? safeAreaInsets.bottom : 0;
const btmHeight = (NBTheme.properties.container.height.rem * 16 + Math.max(btmInset != 0 ? btmInset : +btmInset, NBTheme.properties.container.padding.bottom.rem * 16)).toString() + 'px';

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
				'--body-container-margin-bottom': this.$slots.navigationBar ? btmHeight : '0',
			});
		},
	},
	components: { Expanded },
});
</script>

<style scoped>
.body-container {
	margin-top: var(--body-container-margin-top);
	margin-bottom: var(--body-container-margin-bottom);
}

.fab-wrapper {
	margin-top: var(--body-container-margin-top);
	margin-bottom: var(--body-container-margin-bottom);
	pointer-events: none;
}
</style>
