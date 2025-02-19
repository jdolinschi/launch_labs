<template>
  <a
      href="#"
      class="group relative flex justify-center rounded-sm px-2 py-1.5"
      :class="isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-700'"
      @mouseenter="$emit('open-panel', id)"
      @mouseleave="$emit('close-panel')"
  >
    <svg
        xmlns="http://www.w3.org/2000/svg"
        class="size-5 opacity-75"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
        v-html="icon"
    />
    <span
        class="invisible absolute start-full top-1/2 ms-4 -translate-y-1/2 rounded-sm bg-gray-900 px-2 py-1.5 text-xs font-medium text-white group-hover:visible"
    >
      {{ label }}
    </span>
  </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SidebarItem',
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false
    }
  },
  emits: ['open-panel', 'close-panel']
})
</script>