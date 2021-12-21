<script setup lang="ts">
import CenterAligned from './components/Material/AppBarsTop/CenterAligned/CenterAligned.vue';
import { CAContainerTheme, CAHeadlineTheme, CALeadingNavigationIconTheme, CATrailingIconTheme, CenterAlignedTheme } from './components/Material/AppBarsTop/CenterAligned/CenterAlignedTheme';
import { Color, DynamicColor } from './components/Material/Color';
import { md } from './components/Material/md';

document.body.style.setProperty('--bg-color-light', '#' + md.sys.color.background.light.color);
document.body.style.setProperty('--bg-color-dark', '#' + md.sys.color.background.dark.color);

let app_theme = CenterAlignedTheme.copyWith({
  container_theme: CAContainerTheme.copyWith({
    color: Color.dynamic({
      light: Color.fromHex('FDB035'),
      dark: Color.fromHex('FCA311'),
    }),
  }),
  headline_theme: CAHeadlineTheme.copyWith({
    color: Color.dynamic({
      light: Color.fromHex('FFFFFF'),
      dark: Color.fromHex('FFFFFF'),
    }),
  }),
  leading_navigation_icon_theme: CALeadingNavigationIconTheme.copyWith({
    color: Color.dynamic({
      light: Color.fromHex('FFFFFF'),
      dark: Color.fromHex('FFFFFF'),
    }),
  }),
  trailing_icon_theme: CATrailingIconTheme.copyWith({
    color: Color.dynamic({
      light: Color.fromHex('FFFFFF'),
      dark: Color.fromHex('FFFFFF'),
    }),
  }),
});

</script>

<template>
  <CenterAligned :theme="app_theme" title="Test" />
</template>

<style>
body {
  background: var(--bg-color-light);
}

@media(prefers-color-scheme: dark) {
  body {
    background: var(--bg-color-dark);
  }
}
</style>
