<script setup lang="ts">
import AuthLayout from '@/layout/AuthLayout.vue'
</script>

<template>
  <AuthLayout>
    <template #title>
      <h1 class="text-3xl font-display font-bold text-primary-dark text-center mb-4">
        Iniciar sesión
      </h1>
    </template>
    <div class="flex flex-col items-center justify-center gap-4">
      <p class="text-sm text-primary-dark/70">
        ¿No tienes una cuenta?{' '}
        <a href="/register" class="text-primary font-semibold">Regístrate</a>
      </p>
    </div>
  </AuthLayout>
</template>
