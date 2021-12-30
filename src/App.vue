<script setup lang="ts">
import { material_theme } from './theme';
import { md, EdgeInsets, TextStyle, TextAlign, MainAxisAlignment, CrossAxisAlignment, Colors, Color, mod } from './lib/lib';
import { Container, Scaffold, CenterAligned, NavigationBar, Text, Expanded } from './components/Material/material';

const bgColor = Color.dynamic({
  light: Colors.amber.color50,
  dark: Colors.amber.color30,
});
const textStyle = TextStyle.copyWith({
  align: TextAlign.left
});

</script>

<template>
  <Scaffold :theme="material_theme">
    <template #appBar={data}>
      <CenterAligned :theme="data">Thomas Soto Manager</CenterAligned>
    </template>

    <template #body>
      <!-- <Expanded>
        <Padding :padding="EdgeInsets.symmetric({horizontal: 35, vertical: 50})">
          <Expanded>
            <Column :main-axis-alignment="MainAxisAlignment.spaceBetween" :cross-axis-alignment="CrossAxisAlignment.center">
              <Padding :padding="EdgeInsets.all(8)" v-for="n in 5" :key="n">
                <Text :text-style="TextStyle.dynamic.monochrome({typescale: md.sys.typescale.body_large, align: TextAlign.justify})">A</Text>
              </Padding>
            </Column>
          </Expanded>
        </Padding>
      </Expanded> -->
      <Expanded>
        <Container :padding="EdgeInsets.all(15)" :background="bgColor">
          <Text :text-style="textStyle" contrasting>Hello</Text>
        </Container>
      </Expanded>
    </template>

    <template #navigationBar={data}>
      <NavigationBar :theme="data" />
    </template>
  </Scaffold>
</template>

<style>
:root {
    --sat: env(safe-area-inset-top);
    --sar: env(safe-area-inset-right);
    --sab: env(safe-area-inset-bottom);
    --sal: env(safe-area-inset-left);
}

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
