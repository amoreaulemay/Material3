<template>
    <div class="expanded relative h-full w-full flex flex-grow">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Expanded',
})
</script>


<style>
.expanded > * {
    height: 100% !important;
    width: 100% !important;
}
</style>