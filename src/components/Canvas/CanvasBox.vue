<template>
  <div
      ref="boxRef"
      class="absolute bg-white border rounded shadow overflow-hidden group"
      :style="boxStyle"
  >
    <div class="w-full h-full flex items-center justify-center p-2">
      {{ box.content }}
    </div>
    <button
        class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        @click.stop="removeBox"
        aria-label="Remove box"
    >
      X
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useCanvasStore, type CanvasBox as CanvasBoxType } from '@/stores/canvasStore'
import { useCanvas } from '@/composables/useCanvas'

export default defineComponent({
  name: 'CanvasBox',
  props: {
    box: {
      type: Object as () => CanvasBoxType,
      required: true
    }
  },
  setup(props) {
    const store = useCanvasStore()
    const boxRef = ref<HTMLElement | null>(null)

    // Initialize interact.js on this box
    useCanvas(boxRef, props.box.id)

    const removeBox = () => {
      store.removeBox(props.box.id)
    }

    const boxStyle = computed(() => ({
      width: `${props.box.width}px`,
      height: `${props.box.height}px`,
      transform: `translate(${props.box.x}px, ${props.box.y}px)`
    }))

    return { boxRef, removeBox, boxStyle }
  }
})
</script>
