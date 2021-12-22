<script setup lang="ts">
import CenterAligned from './components/Material/AppBarsTop/CenterAligned/CenterAligned.vue';
import { CAContainerTheme, CAHeadlineTheme, CALeadingNavigationIconTheme, CATrailingIconTheme, CenterAlignedTheme } from './components/Material/AppBarsTop/CenterAligned/CenterAlignedTheme';
import { Color } from './lib/Color';

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

let meta = document.createElement('meta');
meta.setAttribute('name', 'theme-color');
meta.setAttribute('content', app_theme.container_theme.color.light.hex);
meta.setAttribute('media', '(prefers-color-scheme: light)');
document.getElementsByTagName('head')[0].appendChild(meta);

let meta_dark = document.createElement('meta');
meta_dark.setAttribute('name', 'theme-color');
meta_dark.setAttribute('content', app_theme.container_theme.color.dark.hex);
meta_dark.setAttribute('media', '(prefers-color-scheme: dark)');
document.getElementsByTagName('head')[0].appendChild(meta_dark);

</script>

<template>
  <CenterAligned :theme="app_theme" title="Thomas Soto Manager" />
</template>

<style>
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
