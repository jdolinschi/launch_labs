<template>
  <div
      class="flex h-screen flex-col justify-between border-e bg-white transition-all duration-300 ease-in-out absolute left-16 z-10"
      :class="{ 'w-0': !isActive, 'w-[25%]': isActive }"
      @mouseleave="$emit('close-panel')"
      @mouseenter="$emit('keep-open')"
  >
    <div
        class="px-4 py-6 overflow-hidden"
        :class="{ 'opacity-0': !isActive, 'opacity-100': isActive }"
        v-show="isActive"
    >
      <ul class="mt-14 space-y-1">
        <slot></slot>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarPanel',
  props: {
    isActive: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close-panel', 'keep-open']
})
</script>
