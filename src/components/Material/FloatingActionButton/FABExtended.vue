<template>
	<Container :margin="fabPadding" class="flex-shrink select-none" @click="model.callback">
		<div class="fab-extended flex justify-between gap-x-2 items-center p-4 transition-all" :style="theme.container_theme.inline_css" :class="collapsed ? 'fab-collapsed' : ''">
			<IconView v-if="hasIcon" :icon="displayIcon" :color="theme.icon_theme.color" :size="theme.icon_theme.size" />
			<transition name="fab-text">
				<Text :text-style="textStyle" v-show="!collapsed">{{ model.text }}</Text>
			</transition>
		</div>
	</Container>
</template>

<script setup lang="ts">
import { computed, inject, PropType } from 'vue';
import { Container, IconView, Text } from '../material';
import { EdgeInsets, error_icon, Icon, TextStyle } from '../../../lib/lib';
import { FABSpecs } from './FABTheme';
import { FABModel } from './FABModel';
import { MaterialTheme } from '../MaterialTheme';

// Props
const props = defineProps({
	collapsed: {
		type: Boolean,
		default: false,
	},
	model: {
		type: Object as PropType<FABModel>,
		required: true,
	},
});

// Emits
const emit = defineEmits<{
	(e: 'fab-pressed'): void;
}>();

// Theme
const theme = ((inject('theme') as MaterialTheme | undefined) ?? new MaterialTheme()).fab_theme;

// Immutable Properties
const fabPadding = EdgeInsets.all(FABSpecs.properties.container.margin.dp);

// Computed Properties
const hasIcon = computed(() => {
	return typeof props.model.icon !== 'undefined';
});

const textStyle = computed(() => {
	return TextStyle.copyWith({
		color: theme.label_text_theme.color,
		typescale: theme.label_text_theme.typescale,
	});
});

const displayIcon = computed(() => {
	return hasIcon.value ? (props.model.icon as Icon) : error_icon;
});

// Methods
function actionButtonPressed() {
	emit('fab-pressed');
}
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

.fab-text-leave-active,
.fab-text-enter-active {
	transition: all 0.5s ease-in-out;
}

.fab-text-enter-active {
	transition-delay: 0.5s;
}

.fab-text-enter-from,
.fab-text-leave-to {
	opacity: 0;
}

@media (prefers-color-scheme: dark) {
	.fab-extended {
		background: var(--fab-container-color-dark);
		box-shadow: var(--fab-container-elevation-default-dark);
	}
}
</style>
