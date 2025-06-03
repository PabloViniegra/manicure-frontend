<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { UserRole, type UserRegister } from '@/types/types'
import { registerSchema } from '@/types/schemas'

const props = defineProps<{
  loading?: boolean
  apiError?: string | null
}>()

const emit = defineEmits<{
  (e: 'submit', data: UserRegister): void
}>()

function handleSubmit(values: any): void {
  emit('submit', {
    name: `${values.name} ${values.lastname}`,
    full_name: `${values.name} ${values.lastname}`,
    email: values.email,
    password: values.password,
    phone: values.phone,
    address: `${values.address}, ${values.postalCode}`,
    role: UserRole.CLIENT,
  })
}
</script>

<template>
  <Form :validation-schema="registerSchema" @submit="handleSubmit" class="space-y-4">
    <div class="flex gap-2">
      <div class="flex-1">
        <label class="block text-gray-700 font-mont font-medium">Nombre</label>
        <Field
          name="name"
          as="input"
          class="w-full rounded border px-3 py-2 mt-1 font-sans text-black"
          :validateOnInput="true"
        />
        <ErrorMessage name="name" class="text-danger text-xs mt-1" />
      </div>
      <div class="flex-1">
        <label class="block text-gray-700 font-mont font-medium">Apellido</label>
        <Field
          name="lastname"
          as="input"
          class="w-full rounded border px-3 py-2 mt-1 font-sans text-black"
          :validateOnInput="true"
        />
        <ErrorMessage name="lastname" class="text-danger text-xs mt-1" />
      </div>
    </div>
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
    <div class="flex gap-2">
      <div class="flex-1">
        <label class="block text-gray-700 font-mont font-medium">Contraseña</label>
        <Field
          name="password"
          as="input"
          type="password"
          class="w-full rounded border px-3 py-2 mt-1 font-sans text-black"
          :validateOnInput="true"
          autocomplete="new-password"
        />
        <ErrorMessage name="password" class="text-danger text-xs mt-1" />
      </div>
      <div class="flex-1">
        <label class="block text-gray-700 font-mont font-medium">Confirmar contraseña</label>
        <Field
          name="confirmPassword"
          as="input"
          type="password"
          class="w-full rounded border px-3 py-2 mt-1 font-sans text-black"
          :validateOnInput="true"
          autocomplete="new-password"
        />
        <ErrorMessage name="confirmPassword" class="text-danger text-xs mt-1" />
      </div>
    </div>
    <div>
      <label class="block text-gray-700 font-mont font-medium">Teléfono</label>
      <Field
        name="phone"
        as="input"
        class="w-full rounded border px-3 py-2 mt-1 font-sans text-black"
        :validateOnInput="true"
        autocomplete="tel"
      />
      <ErrorMessage name="phone" class="text-danger text-xs mt-1" />
    </div>
    <div>
      <label class="block text-gray-700 font-mont font-medium">Dirección</label>
      <Field
        name="address"
        as="input"
        class="w-full rounded border px-3 py-2 mt-1 font-sans text-black"
        :validateOnInput="true"
        autocomplete="street-address"
      />
      <ErrorMessage name="address" class="text-danger text-xs mt-1" />
    </div>
    <div>
      <label class="block text-gray-700 font-mont font-medium">Código Postal</label>
      <Field
        name="postalCode"
        as="input"
        class="w-full rounded border px-3 py-2 mt-1 font-sans text-black"
        :validateOnInput="true"
        autocomplete="postal-code"
      />
      <ErrorMessage name="postalCode" class="text-danger text-xs mt-1" />
    </div>
    <div v-if="apiError" class="text-danger text-center text-sm mb-2">
      {{ apiError }}
    </div>
    <button
      type="submit"
      class="btn btn-primary glass w-full font-mont font-semibold text-primary-dark bg-white/60 backdrop-blur-md border border-primary/30 shadow-md hover:bg-primary hover:text-white transition-colors"
      :disabled="props.loading"
    >
      {{ props.loading ? 'Registrando...' : 'Registrarse' }}
    </button>
  </Form>
</template>
