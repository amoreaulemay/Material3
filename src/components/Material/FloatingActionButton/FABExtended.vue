<template>
	<Container :margin="fabPadding" class="flex-shrink" @click="actionButtonPressed">
		<div class="fab-extended flex justify-between gap-x-2 items-center p-4 transition-all" :style="theme.container_theme.inline_css" :class="collapsed ? 'fab-collapsed' : ''">
			<IconView v-if="hasIcon" :icon="displayIcon" :color="theme.icon_theme.color" :size="theme.icon_theme.size" />
			<transition name="fab-text">
				<Text :text-style="textStyle" v-show="!collapsed">{{ text }}</Text>
			</transition>
		</div>
	</Container>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { EdgeInsets, error_icon, Icon, TextStyle } from '../../../lib/lib';
import { FABSpecs, FABTheme } from './FABTheme';
import IconView from '../IconView/IconView.vue';
import Container from '../Container/Container.vue';
import Text from '../Text/Text.vue';

export default defineComponent({
	name: 'FABExtended',
	props: {
		theme: {
			type: Object as PropType<FABTheme>,
			default: new FABTheme(),
		},
		icon: {
			type: Object as PropType<Icon>,
			required: false,
		},
		text: {
			type: String,
			required: true,
		},
		collapsed: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			fabPadding: EdgeInsets.all(FABSpecs.properties.container.margin.dp),
		};
	},
	computed: {
		hasIcon(): boolean {
			return typeof this.icon !== 'undefined';
		},
		textStyle(): TextStyle {
			return TextStyle.copyWith({
				color: this.theme.label_text_theme.color,
				typescale: this.theme.label_text_theme.typescale,
			});
		},
		displayIcon(): Icon {
			return this.hasIcon ? (this.icon as Icon) : error_icon;
		},
	},
	components: { Container, IconView, Text },
	methods: {
		actionButtonPressed() {
			this.$emit('fab-pressed');
		},
	},
	emits: ['fab-pressed'],
});
</script>

<style scoped>
.fab-extended {
	height: var(--fab-container-height);
	border-radius: var(--fab-container-shape);
	background: var(--fab-container-color-light);
	z-index: var(--fab-container-z-index);
	pointer-events: all;
	box-shadow: var(--fab-container-elevation-default-light);
	min-width: var(--fab-container-min-width);
	transition: all 0.5s ease-in-out 0s;
}

.fab-collapsed {
	transition-delay: 0.5s;
	min-width: 0px;
}

.fab-text-leave-active {
	transition: all 0.5s ease-in-out 0s;
}

.fab-text-enter-active {
	transition: all 0.5s ease-in-out 0.5s;
}

.fab-text-enter-from,
.fab-text-leave-to {
	opacity: 0;
}

.fab-text-enter-from {
	width: 0px;
	overflow: hidden;
}

@media (prefers-color-scheme: dark) {
	.fab-extended {
		background: var(--fab-container-color-dark);
		box-shadow: var(--fab-container-elevation-default-dark);
	}
}
</style>
