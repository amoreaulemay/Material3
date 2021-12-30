<template>
    <div class="material-container relative h-fit w-fit" :style="inline_css" :id="id">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Color, DynamicColor, EdgeInsets, md} from '../../../lib/lib';
import { v4 as uuid4} from 'uuid';

type Background = Color | DynamicColor;

export default defineComponent({
    name: 'Container',
    props: {
        background: {
            type: Object as PropType<Background>,
            required: false,
        },
        padding: {
            type: Object as PropType<EdgeInsets>,
            default: EdgeInsets.all(0),
        },
        margin: {
            type: Object as PropType<EdgeInsets>,
            default: EdgeInsets.margin.all(0),
        },
    },
    computed: {
        css_vars(): md.ref.css_var {
            let light = '';
            let dark = '';

            if (typeof this.background === 'undefined') {
                light = 'none';
                dark = 'none';
            } else {
                if (this.background instanceof Color) {
                    light = this.background.hex;
                    dark = this.background.hex;
                } else if (this.background instanceof DynamicColor) {
                    light = this.background.light.hex;
                    dark = this.background.dark.hex;
                } else {
                    throw new Error('Invalid type.');
                }
            }

            return {
                '--material-container-background-light': light,
                '--material-container-background-dark': dark,
            }
        },

        background_inline_css(): string {
            return md.ref.generate_style(this.css_vars);
        },
        inline_css(): string {
            return this.background_inline_css + this.padding.inline_css + this.margin.inline_css.replaceAll('padding', 'margin') + this.inline_contrasting_colors;
        },
        contrastingColor(): DynamicColor | undefined {
            if (typeof this.background === 'undefined') {
                return undefined;
            } else {
                if (this.background instanceof Color) {
                    return Color.toDynamic(Color.getContrastingShade(this.background));
                } else if (this.background instanceof DynamicColor) {
                    return Color.dynamic({
                        light: Color.getContrastingShade(this.background.light),
                        dark: Color.getContrastingShade(this.background.dark),
                    });
                }
            }
        },
        id(): string {
            return uuid4();
        },
        inline_contrasting_colors(): string {
            return md.ref.generate_style({
                '--container-contrasting-color-light': this.contrastingColor?.light.hex ?? 'none',
                '--container-contrasting-color-dark': this.contrastingColor?.dark.hex ?? 'none',
            });
        },
    },
});
</script>


<style scoped>
    .material-container:empty {
        height: 100%;
        width: 100%;
    }

    .material-container {
        background: var(--material-container-background-light);
        padding-bottom: var(--padding-bottom);
        padding-left: var(--padding-left);
        padding-right: var(--padding-right);
        padding-top: var(--padding-top);
        margin-bottom: var(--margin-bottom);
        margin-left: var(--margin-left);
        margin-right: var(--margin-right);
        margin-top: var(--margin-top);
    }

    @media(prefers-color-scheme: dark) {
        .material-container {
            background: var(--material-container-background-dark);
        }
    }
</style>