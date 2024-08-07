<script setup>
import { RouterView } from 'vue-router'
import TheHeader from './components/TheHeader.vue'
</script>

<template>
  <div>
    <TheHeader />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
