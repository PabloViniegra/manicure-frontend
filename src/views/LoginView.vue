<script setup lang="ts">
import AuthLayout from '@/layout/AuthLayout.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import { useAuth } from '@/composables/useAuth'

const { login, isLoging, error } = useAuth()

function handleLogin(values: any): void {
  login(values)
}
</script>

<template>
  <AuthLayout>
    <template #title>
      <h1 class="text-3xl font-display font-bold text-primary-dark text-center mb-8">
        Iniciar sesión
      </h1>
    </template>
    <div class="flex flex-col items-center justify-center gap-4">
      <LoginForm :loading="isLoging" :apiError="error" @submit="handleLogin" />
      <p class="text-sm text-primary-dark/70 font-sans">
        ¿No tienes cuenta?
        <a href="/register" class="text-primary font-semibold font-sans">Regístrate</a>
      </p>
    </div>
  </AuthLayout>
</template>
