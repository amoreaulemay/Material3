<template>
    <nav class="container mx-auto flex h-14 p-4">
        <div class="flex-auto text-left align-baseline">Left</div>
        <div class="flex-auto text-center align-baseline">
            <h6 class="font-rubik font-medium text-xl capitalize">Middle</h6>
        </div>
        <div class="flex-auto text-right align-baseline">Right</div>
        <CenterAligned />
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CenterAligned from './Material/AppBarsTop/CenterAligned/CenterAligned.vue'

export default defineComponent({
    components: {
        CenterAligned
    }
})
</script>
