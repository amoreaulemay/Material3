<template>
    <div class="container fixed top-0 left-0 max-w-full flex items-center px-4" :style="theme.container_theme.inline_css" :id="containerID">
        <div class="shrink min-w-[48px] min-h-[48px] relative">
            <span class="material-icons absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 leading-icon" :style="theme.leading_navigation_icon_theme.inline_css">menu</span>
        </div>
        <div class="flex-auto h-full spacer"></div>
        <div class="flex-auto headline h-min text-center" :style="theme.headline_theme.inline_css">
            {{ title }}
        </div>
        <div class="flex-auto h-full spacer"></div>
        <div class="shrink min-w-[48px] min-h-[48px] relative">
            <span class="material-icons absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 trailing-icon" :style="theme.trailing_icon_theme.inline_css">account_circle</span>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { md } from '../../md';
import { CATheme, CenterAlignedTheme } from './CenterAlignedTheme'
// @ts-ignore: Unreachable code error
import { v4 as uuidv4} from 'uuid';

export default defineComponent({
    name: 'CenterAligned',
    props: {
        theme: {
            type: Object as PropType<CenterAlignedTheme>,
            default: new CenterAlignedTheme(),
        },
        title: {
            type: String,
            required: false,
        },
        main_view_id: {
            type: String,
            required: false,
        }
    },
    computed: {
        containerID(): string {
            return uuidv4();
        },
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    unmounted() {
        window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
        onScroll() {
            let scroll = 0;

            if (typeof this.main_view_id !== 'undefined') {
                scroll = document.getElementById(this.main_view_id)?.scrollTop ?? 0;
            } else {
                scroll = window.scrollY;
            }

            if(scroll === 0) {
                document.getElementById(this.containerID)?.classList.remove('on-scroll');
            } else {
                document.getElementById(this.containerID)?.classList.add('on-scroll');
            }
        }
    }
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
}

.trailing-icon {
    color: var(--ca-trailing-icon-color-light);
}

.spacer {
    min-width: var(--spacer-width);

}
@media(prefers-color-scheme: dark) {
    .container {
        background: var(--ca-container-color-dark);
        box-shadow: var(--ca-container-elevation-dark);
    }

    .container.on-scroll {
        box-shadow: var(--ca-container-elevation-on-scroll-dark);
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