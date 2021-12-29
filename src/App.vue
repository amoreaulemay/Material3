<script setup lang="ts">
import { material_theme } from './theme';
import { md, EdgeInsets, TextStyle, TextAlign } from './lib/lib';
import { Center, CenterAligned, Column, Expanded, NavigationBar, Padding, Scaffold, Text, } from './components/Material/material';

</script>

<template>
  <Scaffold :theme="material_theme">
    <template #appBar={data}>
      <CenterAligned :theme="data">Thomas Soto Manager</CenterAligned>
    </template>

    <template #body>
      <!-- <Center>
        <Text :text-style="TextStyle.dynamic.monochrome({typescale: md.sys.typescale.body_large, align: TextAlign.justify})">Hey this is from text!</Text>
      </Center> -->
      <!-- <Expanded>
        <Text :text-style="TextStyle.dynamic.monochrome({typescale: md.sys.typescale.body_large, align: TextAlign.justify})">Hey this is from text!</Text>
      </Expanded> -->
      <!-- <Expanded>
        <Center>
          <Text :text-style="TextStyle.dynamic.monochrome({typescale: md.sys.typescale.body_large, align: TextAlign.justify})">Hey this is from text!</Text>
        </Center>
      </Expanded> -->
      <!-- <Expanded>
        <Padding :padding="EdgeInsets.all(8)">
          <Text :text-style="TextStyle.dynamic.monochrome({typescale: md.sys.typescale.body_large, align: TextAlign.justify})">Hey this is from text!</Text>
        </Padding>
      </Expanded> -->
      <Column>
        <Expanded v-for="n in 15" :key="n">
          <Padding :padding="EdgeInsets.all(8)">
            <Text :text-style="TextStyle.dynamic.monochrome({typescale: md.sys.typescale.body_large, align: TextAlign.justify})">Hey this is from text!</Text>
          </Padding>
        </Expanded>
      </Column>
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
