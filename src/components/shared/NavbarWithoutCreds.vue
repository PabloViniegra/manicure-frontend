<script setup lang="ts">
import MainLogo from './icons/MainLogo.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
<template>
  <nav
    class="w-full flex items-center justify-between py-4 px-6 rounded-2xl bg-surface/80 backdrop-blur-md shadow border border-primary/10"
  >
    <div class="flex items-center gap-3 select-none">
      <span class="inline-block">
        <MainLogo class="size-8" />
      </span>
      <span class="font-display font-extrabold text-2xl text-primary-dark tracking-tight">
        Manicure Dates
      </span>
    </div>
    <div class="flex gap-3">
      <button
        class="btn btn-accent font-sans text-sm text-white font-semibold"
        @click="router.push('/login')"
      >
        Iniciar sesión
      </button>
      <button
        class="btn btn-gradient btn-primary font-sans text-sm text-white font-semibold"
        @click="router.push('/register')"
      >
        Registrarse
      </button>
    </div>
  </nav>
</template>
