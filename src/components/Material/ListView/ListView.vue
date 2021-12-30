<template>
    <div class="list-view flex overscroll-contain" :class="inline_class">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ListViewDirection } from '../../../lib/lib';

export default defineComponent({
    name: 'ListView',
    props: {
        direction: {
            type: Number as PropType<ListViewDirection>,
            default: ListViewDirection.column,
        }
    },
    computed: {
        inline_class(): string {
            return this.direction == ListViewDirection.column ? 'column' : 'row';
        }
    }
})
</script>


<style scoped>
.list-view.column {
    flex-direction: column;
    height: 100%;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    width: fit-content;
}

.list-view.row {
    flex-direction: row;
    width: 100%;
    max-height: 100%;
    overflow-y: hidden;
    overflow-x: auto;
    height: fit-content;
}
</style>