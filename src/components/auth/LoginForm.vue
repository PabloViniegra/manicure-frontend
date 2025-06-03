<script setup lang="ts">
import { ref } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { loginSchema } from '@/types/schemas'

const props = defineProps<{
  loading?: boolean
  apiError?: string | null
}>()

const emit = defineEmits<{
  (e: 'submit', data: { username: string; password: string }): void
}>()

const showPassword = ref(false)

function onSubmit(values: any): void {
  emit('submit', {
    username: values.email,
    password: values.password,
  })
}
</script>

<template>
  <Form :validation-schema="loginSchema" class="space-y-4" @submit="onSubmit">
    <div>
      <label class="block text-gray-700 font-mont font-medium">Email</label>
      <Field
        name="email"
        as="input"
        type="email"
        class="w-full rounded border px-3 py-2 mt-1 font-sans text-black"
        :validateOnInput="true"
        autocomplete="email"
      />
      <ErrorMessage name="email" class="text-danger text-xs mt-1" />
    </div>
    <div>
      <label class="block text-gray-700 font-mont font-medium">Contraseña</label>
      <div class="relative">
        <Field
          name="password"
          :type="showPassword ? 'text' : 'password'"
          as="input"
          class="w-full rounded border px-3 py-2 mt-1 font-sans text-black pr-10"
          :validateOnInput="true"
          autocomplete="current-password"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          tabindex="-1"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-primary-dark/70 hover:text-primary-dark"
        >
          <span v-if="showPassword">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          </span>
          <span v-else>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a10.036 10.036 0 012.113-3.592M6.2 6.2A9.964 9.964 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.97 9.97 0 01-4.304 5.118M15 12a3 3 0 11-6 0 3 3 0 016 0zm-7.5 7.5l15-15"
              />
            </svg>
          </span>
        </button>
      </div>
      <ErrorMessage name="password" class="text-danger text-xs mt-1" />
    </div>
    <div v-if="apiError" class="text-danger text-center text-sm mb-2">
      {{ apiError }}
    </div>
    <button
      type="submit"
      class="btn btn-primary glass w-full font-mont font-semibold text-primary-dark bg-white/60 backdrop-blur-md border border-primary/30 shadow-md hover:bg-primary hover:text-white transition-colors"
      :disabled="props.loading"
    >
      {{ props.loading ? 'Accediendo...' : 'Iniciar sesión' }}
    </button>
  </Form>
</template>
