<template>
    <div class="h-12 w-16 flex flex-col" :style="theme.icon_theme.inline_css + theme.label_theme.inline_css" :id="destination.id">
        <div class="active-indicator h-8 w-16 rounded-2xl relative" :class="destination.active ? 'active' : ''">
            <div class="large-badge" :class="destination.active ? 'active' : ''"></div>
            <div class="small-badge" :class="destination.active ? 'active' : ''"></div>
            <div class="icon" :class="destination.active ? 'active' : ''">
                <span :class="destination.icon?.css_class" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{{ destination.icon?.name }}</span>
            </div>
        </div>
        <div class="text-spacer h-1 w-full" :class="destination.active ? 'active' : ''"></div>
        <div class="label-text text-center" :class="destination.active ? 'active' : ''">
            {{ destination.label }}
        </div>
    </div>
    <NBSpacer />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { NBDestinationTheme } from './NavigationBarTheme';
import { NBDestinationItem } from './NBDestinationItem';
import NBSpacer from './NBSpacer.vue';

export default defineComponent({
    name: 'NBDestination',
    props: {
        theme: {
            type: Object as PropType<NBDestinationTheme>,
            required: true,
        },
        destination: {
            type: Object as PropType<NBDestinationItem>,
            required: true,
        },
    },
    components: {
        'NBSpacer': NBSpacer,
    }
});
</script>


<style scoped>
.active-indicator.active {
    @apply bg-white;
}

.icon {
    @apply text-white text-2xl;
}

.icon.active {
    @apply text-black;
}

.label-text {
    color: var(--nb-label-text-color-inactive-light);
    font-family: var(--nb-label-text-font);
    font-size: var(--nb-label-text-size);
    line-height: var(--nb-label-text-line-height);
    letter-spacing: var(--nb-label-text-tracking);
    font-weight: var(--nb-label-text-weight);
}

.label-text.active {
    color: var(--nb-label-text-color-active-light);
}

@media(prefers-color-scheme: dark) {
    .label-text {
        color: var(--nb-label-text-color-inactive-dark);
    }

    .label-text.active {
        color: var(--nb-label-text-color-active-dark);
    }
}
</style>