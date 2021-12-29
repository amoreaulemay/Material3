<template>
    <div class="flex flex-col h-full max-w-full overflow-hidden">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Column',
})
</script>