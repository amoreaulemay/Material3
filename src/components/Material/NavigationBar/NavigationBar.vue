<template>
    <div class="container fixed bottom-0 left-0 max-w-full flex items-center justify-center select-none" :id="containerID" :style="theme.container_theme.inline_css">
        <NBSpacer />
        <NBDestination :theme="theme.destination_theme" v-for="destination in destinations" :key="destination.id" :destination="destination" @destination-clicked="onDestinationClicked" />
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
// @ts-ignore: Unreachable code error
import { v4 as uuidv4} from 'uuid';
import { NavigationBarTheme } from './NavigationBarTheme';
import NBSpacer from './NBSpacer.vue';
import NBDestination from './NBDestination.vue';
import { generateDestinations, NBDestinationItem } from './NBDestinationItem';

export default defineComponent({
    props: {
        theme: {
            type: Object as PropType<NavigationBarTheme>,
            default: new NavigationBarTheme(),
        }
    },
    computed: {
        containerID(): string {
            return uuidv4();
        },
    },
    components: { NBSpacer, NBDestination },
    data() {
        return {
            destinations: generateDestinations(3),
        }
    },
    methods: {
        onDestinationClicked(destination: NBDestinationItem) {
            this.destinations.forEach(x => {
                if (x.id !== destination.id) {
                    x.setInactive();
                } else {
                    x.setActive();
                }
            });
        }
    }
})
</script>


<style scoped>
.container {
    background: var(--nb-container-color-light);
    box-shadow: var(--nb-container-elevation-light);
    height: calc(var(--nb-container-height) + max(env(safe-area-inset-bottom), var(--nb-container-padding-bottom)));
    border-radius: var(--nb-container-shape);
    z-index: var(--nb-container-z-index);
    padding-top: var(--nb-container-padding-top);
    padding-bottom: max(env(safe-area-inset-bottom), var(--nb-container-padding-bottom));
}

@media(prefers-color-scheme: dark) {
    .container {
        background: var(--nb-container-color-dark);
    }
}
</style>