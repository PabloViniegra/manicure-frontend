<script setup lang="ts">
import AuthLayout from '@/layout/AuthLayout.vue'
import { useAuth } from '@/composables/useAuth'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import { type UserRegister } from '@/types/types'

const { register, isRegistering, error } = useAuth()

function onSubmit(formData: UserRegister): void {
  register(formData)
}
</script>
<template>
  <AuthLayout>
    <template #title>
      <h1 class="text-3xl font-display font-extrabold text-primary-dark text-center mb-6">
        Registrarse
      </h1>
    </template>
    <RegisterForm :loading="isRegistering" :error="error" @submit="onSubmit" />
    <div class="flex flex-col items-center justify-center gap-4 mt-4">
      <p class="text-sm text-primary-dark/70 font-sans">
        ¿Tienes cuenta ya?
        <a href="/login" class="text-primary font-semibold font-sans">Accede</a>
      </p>
    </div>
  </AuthLayout>
</template>
