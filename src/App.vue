<script setup lang="ts">
import CenterAligned from './components/Material/AppBarsTop/CenterAligned/CenterAligned.vue';
import { CAContainerTheme, CAHeadlineTheme, CALeadingNavigationIconTheme, CATrailingIconTheme, CenterAlignedTheme } from './components/Material/AppBarsTop/CenterAligned/CenterAlignedTheme';
import { MaterialTheme } from './components/Material/MaterialTheme';
import { Color, Palette } from './lib/Color';

// document.body.style.setProperty('--bg-color-light', '#' + md.sys.color.background.light.color);
// document.body.style.setProperty('--bg-color-dark', '#' + md.sys.color.background.dark.color);

// let palette = Palette.copyWith({
//     primary: Color.fromHex('53846a'),
//     secondary: Color.fromHex('e6e1e7'),
//     tertiary: Color.fromHex('7fa993'),
//     neutral: Color.fromHex('383239'),
//     neutral_variant: Color.fromHex('19181a'),
//   });

let palette = Palette.copyWith({
    primary: Color.fromHex('000000'),
    secondary: Color.fromHex('000000'),
    tertiary: Color.fromHex('000000'),
    neutral: Color.fromHex('000000'),
    neutral_variant: Color.fromHex('000000'),
  });

document.body.style.setProperty('--bg-color-dark', palette.colors.surface.dark.hex);
document.body.style.setProperty('--bg-color-light', palette.colors.surface.light.hex);

let app_theme = CenterAlignedTheme.copyWith({
  palette: palette,
  container_theme: CAContainerTheme.copyWith({
    color: Color.dynamic({
      light: Color.fromRGB({r: 0, g: 0, b: 0}),
      dark: Color.fromRGB({r: 0, g: 0, b: 0}),
    }),
  }),
  headline_theme: CAHeadlineTheme.copyWith({
    color: Color.dynamic({
      light: Color.fromRGB({r: 255, g: 255, b: 255}),
      dark: Color.fromRGB({r: 255, g: 255, b: 255}),
    }),
  }),
  trailing_icon_theme: CATrailingIconTheme.copyWith({
    color: Color.dynamic({
      light: Color.fromRGB({r: 255, g: 255, b: 255}),
      dark: Color.fromRGB({r: 255, g: 255, b: 255}),
    }),
  }),
  leading_navigation_icon_theme: CALeadingNavigationIconTheme.copyWith({
    color: Color.dynamic({
      light: Color.fromRGB({r: 255, g: 255, b: 255}),
      dark: Color.fromRGB({r: 255, g: 255, b: 255}),
    }),
  }),
});

let material_theme = MaterialTheme.copyWith({
  palette: palette,
});

material_theme.createMeta();

</script>

<template>
  <CenterAligned :theme="app_theme" title="Thomas Soto Manager" />
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
