<template>
    <p class="text" :style="textStyle.inline_css"><slot></slot></p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TextStyle } from '../../../lib/TextStyle';

export default defineComponent({
    name: 'Text',
    props: {
        textStyle: {
            type: Object as PropType<TextStyle>,
            default: new TextStyle(),
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