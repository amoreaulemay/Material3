<template>
    <div class="scaffold h-full w-full">
        <slot name="appBar" :data="theme.app_bar_theme"></slot>
        <div class="body-container fixed top-0 bottom-0 left-0 right-0 overflow-hidden z-0" :style="bodyContainerInlineCss">
            <slot name="body"></slot>
        </div>
        <slot name="navigationBar" :data="theme.navigation_bar_theme"></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { md } from '../../../lib/md';
import { CATheme } from '../AppBarsTop/CenterAligned/CenterAlignedTheme';
import { MaterialTheme } from '../MaterialTheme';
import { NBTheme } from '../NavigationBar/NavigationBarTheme';

const btmInset = getComputedStyle(document.documentElement).getPropertyValue('--sab');
const btmHeight = ((NBTheme.properties.container.height.rem * 16) + Math.max(isNaN(+btmInset) ? 0 : +btmInset, NBTheme.properties.container.padding.bottom.rem * 16)).toString() + 'px';

export default defineComponent({
    name: 'Scaffold',
    props: {
        theme: {
            type: Object as PropType<MaterialTheme>,
            default: new MaterialTheme(),
        },
    },
    computed: {
        bodyContainerInlineCss(): string {
            return md.ref.generate_style({
                '--body-container-margin-top': this.$slots.appBar ? CATheme.properties.container_height.rem.toString() + 'rem' : '0',
                '--body-container-margin-bottom': this.$slots.navigationBar ? btmHeight : '0',
            });
        }
    }
});
</script>


<style>
.body-container {
    margin-top: var(--body-container-margin-top);
    margin-bottom: var(--body-container-margin-bottom);
}
</style>