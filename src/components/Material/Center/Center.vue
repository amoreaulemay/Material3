<template>
    <div class="wrapper">
        <div class="center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-full max-h-full w-fit h-fit">
            <slot></slot>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Center'
});
</script>

<style>
div:not(.expanded) > .wrapper {
    height: 100%;
    width: 100%;
    position: relative;
}
</style>