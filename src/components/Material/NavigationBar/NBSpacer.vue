<template>
    <div class="h-full spacer flex-auto"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'NBSpacer',
})
</script>


<style scoped>
.spacer {
    min-width: var(--nb-container-space-between-destinations);
}
</style>