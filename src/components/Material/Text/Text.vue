<template>
    <p class="text" :style="_textStyle.inline_css" :id="id"><slot></slot></p>
</template>

<script lang="ts">
/// <reference path="../../../global.d.ts" />
import { defineComponent, PropType } from 'vue';
import { TextStyle, DynamicColor, Color, Colors } from '../../../lib/lib';
import { v4 as uuid4 } from 'uuid';

export default defineComponent({
    name: 'Text',
    props: {
        textStyle: {
            type: Object as PropType<TextStyle>,
            default: new TextStyle(),
        },
        contrasting: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        id(): string {
            return uuid4();
        },
    },
    data() {
        return {
            _textStyle: this.textStyle,
        }
    },
    mounted() {
        this._textStyle = this.contrasting ? this.contrastingColors() : this.textStyle;
    },
    methods: {
        contrastingColors(): TextStyle {
            let curr_el = document.getElementById(this.id);
            let par_el = curr_el?.parentElement;

            if (typeof par_el !== 'undefined' && par_el !== null) {
                let inline_css = par_el.style.cssText.split('; ');
                let light_var = inline_css.find(style => style.includes('--container-contrasting-color-light'));
                let dark_var = inline_css.find(style => style.includes('--container-contrasting-color-dark'));

                let light_value = light_var?.slice(light_var.indexOf(':') + 1).replaceAll(';', '');
                let dark_value = dark_var?.slice(dark_var.indexOf(':') + 1).replaceAll(';', '');

                if (typeof light_value !== 'undefined' && typeof dark_value !== 'undefined') {
                    if (light_value == 'none' || dark_value == 'none') {
                        return this.textStyle;
                    } else {
                        light_value = light_value.replaceAll('#', '');
                        dark_value = dark_value.replaceAll('#', '');
                        let color = Colors.dynamic.pure_black;
                        try {
                            color = Color.dynamic({
                                light: Color.fromHex(light_value),
                                dark: Color.fromHex(dark_value),
                            });
                        } catch (err) {
                            console.error(err);
                        }

                        return TextStyle.copyWith({
                            color: color,
                            align: this.textStyle.align,
                            typescale: this.textStyle.typescale
                        });
                    }
                } else if (window.__ENV_BODY__ instanceof DynamicColor) {
                    return TextStyle.copyWith({
                        color: window.__ENV_BODY__,
                        align: this.textStyle.align,
                        typescale: this.textStyle.typescale,
                    });
                } else {
                    return this.textStyle;
                }
            } else {
                return this.textStyle;
            }
        }
    }
});
</script>

<style scoped>
.text {
    /* Color */
    color: var(--text-style-color-light);

    /* Align */
    text-align: var(--text-style-align);

    /* Typescale */
    font-family: var(--text-style-font);
    line-height: var(--text-style-line-height);
    font-size: var(--text-style-size);
    letter-spacing: var(--text-style-tracking);
    font-weight: var(--text-style-weight);
}

@media(prefers-color-scheme: dark) {
    .text {
        color: var(--text-style-color-dark);
    }
}
</style>