<script setup lang="ts">
import Footer from '@/components/shared/Footer.vue'
</script>
<template>
  <main class="min-h-screen bg-background flex items-center justify-center">
    <div
      class="w-full max-w-7xl mx-auto min-h-screen rounded-3xl p-8 shadow-xl bg-surface/70 backdrop-blur-lg border border-primary/10 flex flex-col"
    >
      <header class="mb-8">
        <slot name="header">
          <h1 class="font-mont text-2xl font-bold text-primary-dark tracking-tight">
            Reserva tu cita
          </h1>
        </slot>
      </header>
      <main class="flex-1">
        <slot />
      </main>
      <Footer />
    </div>
  </main>
</template>
