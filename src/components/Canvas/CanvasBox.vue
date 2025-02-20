<template>
  <div
      ref="boxRef"
      class="absolute bg-white border rounded shadow overflow-hidden group"
      :style="{ width: `${box.width}px`, height: `${box.height}px`, transform: `translate(${box.x}px, ${box.y}px)` }"
  >
    <div class="w-full h-full flex items-center justify-center p-2">
      {{ box.content }}
    </div>
    <button
        class="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        @click="removeBox"
    >
      X
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useCanvasStore } from '@/stores/canvasStore'
import { useCanvas } from '@/composables/useCanvas'

export default defineComponent({
  name: 'CanvasBox',
  props: {
    box: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const store = useCanvasStore()
    const boxRef = ref<HTMLElement | null>(null)

    useCanvas(boxRef, props.box.id)

    const removeBox = () => {
      store.removeBox(props.box.id)
    }

    return { boxRef, removeBox }
  }
})
</script>