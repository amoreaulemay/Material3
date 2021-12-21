<script setup lang="ts">
import CenterAligned from './components/Material/AppBarsTop/CenterAligned/CenterAligned.vue';
import { CAContainerTheme, CAHeadlineTheme, CALeadingNavigationIconTheme, CATrailingIconTheme, CenterAlignedTheme } from './components/Material/AppBarsTop/CenterAligned/CenterAlignedTheme';
import { Color, DynamicColor } from './components/Material/Color';
import { md } from './components/Material/md';

// document.body.style.setProperty('--bg-color-light', '#' + md.sys.color.background.light.color);
// document.body.style.setProperty('--bg-color-dark', '#' + md.sys.color.background.dark.color);

document.body.style.setProperty('--bg-color-dark', Color.shadeColor(Color.fromHex('14213D'), -40).hex);
document.body.style.setProperty('--bg-color-light', Color.shadeColor(Color.fromHex('243B6E'), -40).hex);

let app_theme = CenterAlignedTheme.copyWith({
  container_theme: CAContainerTheme.copyWith({
    color: Color.dynamic({
      light: Color.fromHex('243B6E'),
      dark: Color.fromHex('14213D'),
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
