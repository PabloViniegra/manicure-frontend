<script setup lang="ts">
import Footer from '@/components/shared/Footer.vue'
</script>
<template>
  <div
    class="min-h-screen bg-gradient-to-tr from-primary-light via-background to-gray-100 flex items-center justify-center"
  >
    <div class="relative w-full max-w-md mx-auto rounded-2xl p-8 shadow-2xl glass">
      <h2 class="text-3xl font-display font-bold text-primary-dark text-center mb-4">
        <slot name="title">Bienvenid@</slot>
      </h2>
      <slot />
      <Footer />
    </div>
  </div>
</template>

<style scoped>
.glass {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px) saturate(1.2);
  border: 1.5px solid rgba(200, 220, 255, 0.25);
}
</style>
