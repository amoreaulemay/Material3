<template>
    <div class="h-full w-16 flex flex-col" :style="theme.icon_theme.inline_css + theme.label_theme.inline_css" :id="destination.id" @click="destinationClicked">
        <div class="active-indicator h-8 w-16 rounded-2xl relative" :class="destination.active ? 'active' : ''" :style="theme.active_indicator_theme.inline_css">
            <div class="large-badge" :class="destination.active ? 'active' : ''"></div>
            <div class="small-badge" :class="destination.active ? 'active' : ''"></div>
            <div class="icon" :class="destination.active ? 'active' : ''">
                <span :class="destination.icon?.css_class" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">{{ destination.icon?.name }}</span>
            </div>
        </div>
        <NBTextSpacer />
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
import NBTextSpacer from './NBTextSpacer.vue';

export default defineComponent({
    name: 'NBDestination',
    emits: [
        'destination-clicked'
    ],
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
        NBSpacer,
        NBTextSpacer
    },
    methods: {
        destinationClicked() {
            this.$emit('destination-clicked', this.destination);
        },
    },
});
</script>


<style scoped>
.active-indicator {
    background: none;
}

.active-indicator.active {
    background: var(--nb-active-indicator-color-light);
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

    .active-indicator.active {
        background: var(--nb-active-indicator-color-dark);
    }
}
</style>