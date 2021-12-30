<template>
    <div class="row flex flex-row overflow-hidden w-full max-h-full h-fit" :style="inline_css">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { MainAxisAlignment, CrossAxisAlignment, md } from '../../../lib/lib'

export default defineComponent({
    name: 'Row',
    props: {
        mainAxisAlignment: {
            type: String as PropType<MainAxisAlignment>,
            default: MainAxisAlignment.start,
        },
        crossAxisAlignment: {
            type: String as PropType<CrossAxisAlignment>,
            default: CrossAxisAlignment.center,
        }
    },
    computed: {
        inline_css(): string {
            return md.ref.alignment.generate_main_style(this.mainAxisAlignment) + md.ref.alignment.generate_cross_style(this.crossAxisAlignment);
        }
    }
})
</script>

<style scoped>
.row {
    justify-content: var(--main-axis-alignment);
    align-items: var(--cross-axis-alignment);
}
</style>