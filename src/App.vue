<script setup lang="ts">
import CenterAligned from './components/Material/AppBarsTop/CenterAligned/CenterAligned.vue';
import NavigationBar from './components/Material/NavigationBar/NavigationBar.vue';

import { CAContainerTheme, CAHeadlineTheme, CALeadingNavigationIconTheme, CATrailingIconTheme, CenterAlignedTheme } from './components/Material/AppBarsTop/CenterAligned/CenterAlignedTheme';
import { MaterialTheme } from './components/Material/MaterialTheme';
import { Color, Colors, Palette } from './lib/Color';
import { NavigationBarTheme, NBContainerTheme, NBDestinationTheme, NBLabelTextTheme } from './components/Material/NavigationBar/NavigationBarTheme';
import { material_theme } from './theme';

</script>

<template>
  <CenterAligned :theme="material_theme.app_bar_theme" title="Thomas Soto Manager" />
  <NavigationBar :theme="material_theme.navigation_bar_theme" />
</template>

<style>
html, body {
    height: 100%;
    overflow: hidden;
}

#app {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
}

body {
  background: var(--bg-color-light);
  touch-action: pan-x pan-y;
}

@media(prefers-color-scheme: dark) {
  body {
    background: var(--bg-color-dark);
  }
}
</style>
