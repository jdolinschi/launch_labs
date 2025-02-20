<template>
  <div class="absolute top-0 left-16 right-0 bottom-0 bg-gray-50 overflow-hidden">
    <canvas-box v-for="box in boxes" :key="box.id" :box="box" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CanvasBox from './CanvasBox.vue'
import { useCanvasStore } from '@/stores/canvasStore'

export default defineComponent({
  name: 'Canvas',
  components: { CanvasBox },
  setup() {
    const store = useCanvasStore()
    return { boxes: store.boxes }
  }
})
</script>