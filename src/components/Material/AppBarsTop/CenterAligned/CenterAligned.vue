<template>
    <div class="container max-w-full flex items-center" :style="containerVars" :id="containerID">
        <div class="shrink leading-navigation-icon"></div>
        <div class="shrink h-full spacer"></div>
        <div class="grow headline h-min" :style="headlineVars">
            <h6>Hello</h6>
        </div>
        <div class="shrink h-full spacer"></div>
        <div class="shrink trailing-icon"></div>
    </div>
    <div style="height: 1000px; width: 10px; top: 50px; position: absolute"></div>
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
        }
    },
    computed: {
        containerVars(): string {
            let vars = [
                `--surface-light: #${this.theme.container_theme.color.light.color}`,
                `--surface-dark: #${this.theme.container_theme.color.dark.color}`,
                '--elevation-light: ' + md.ref.elevation.css(this.theme.container_theme.elevation).light,
                '--elevation-on-scroll-light: ' + md.ref.elevation.css(this.theme.container_theme.elevation_on_scroll).light,
                `--elevation-dark: ${md.ref.elevation.css(this.theme.container_theme.elevation).dark}`,
                `--elevation-on-scroll-dark: ${md.ref.elevation.css(this.theme.container_theme.elevation_on_scroll).dark}`,
                `--border-radius: ${CATheme.properties.container_shape.rem}rem`,
                `z-index: ${this.theme.container_theme.z_index}`,
                `--container-height: ${CATheme.properties.container_height.rem}rem`,
                `--left-right-padding: ${CATheme.properties.left_right_padding.rem}rem`,
                `--spacer-width: ${CATheme.properties.padding_between_elements.rem}rem`,
            ]

            return vars.join(';');
        },
        containerID(): string {
            return uuidv4();
        },
        avatarVars(): string {
            let vars: string[] = [
                `--avatar-shape: ${CATheme.properties.avatar_shape.rem}rem`,
                `--avatar-size: ${CATheme.properties.avatar_size.rem}rem`,
            ];

            return vars.join(';');
        },
        headlineVars(): string {
            let vars: string[] = [
                this.theme.headline_theme.css_style,
                `--headline-color-light: #${this.theme.headline_theme.color.light.color}`,
                `--headline-color-dark: #${this.theme.headline_theme.color.dark.color}`,
            ];

            return vars.join(';');
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    unmounted() {
        window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
        onScroll() {
            if(window.scrollY === 0) {
                document.getElementById(this.containerID)?.classList.remove('on-scroll');
            } else {
                document.getElementById(this.containerID)?.classList.add('on-scroll');
            }
        }
    }
});
</script>

<style scoped>
.on-scroll {
    box-shadow: var(--elevation-on-scroll-light) !important;
}

div.container {
    background: var(--surface-light);
    box-shadow: var(--elevation-light);
    border-radius: var(--border-radius);
    height: var(--container-height);
    position: fixed;
    top: 0;
    left: 0;
    padding-left: var(--left-right-padding);
    padding-right: var(--left-right-padding);
}

div.headline {
    text-align: center;
    color: var(--headline-color-light);
}

div.spacer {
    min-width: var(--spacer-width);
}

.avatar {
    border-radius: var(--avatar-shape);
    width: var(--avatar-size);
    height: var(--avatar-height);
}

@media(prefers-color-scheme: dark) {
    div.container {
        background: var(--surface-dark);
        box-shadow: var(--elevation-dark);
    }

    div.headline {
        color: var(--headline-color-dark);
    }

    .on-scroll {
        box-shadow: var(--elevation-on-scroll-dark) !important;
    }
}
</style>