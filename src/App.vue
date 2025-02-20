<template>
  <sidebar />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Sidebar from './components/Sidebar/Sidebar.vue'

export default defineComponent({
  name: 'App',
  components: { Sidebar }
})
</script>