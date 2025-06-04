<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { appointmentCreateSchema } from '@/types/schemas'
import { useServices } from '@/composables/useServices'
import { useAppointments } from '@/composables/useAppointments'
import { useAuth } from '@/composables/useAuth'
import type { AppointmentCreate } from '@/types/types'

const props = defineProps<{
  show: boolean
  date: string
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const { services } = useServices()
const { createAppointment, isCreating } = useAppointments()
const { me } = useAuth()

async function onSubmit(values: any): Promise<void> {
  if (!me.value) return
  const appointment: AppointmentCreate = {
    client_id: me.value.client_id,
    date: props.date,
    notes: values.notes,
    service_ids: values.service_ids.map((id: string) => Number(id)),
  }
  await createAppointment(appointment)
  emit('close')
}
</script>
<template>
  <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <h3 class="text-lg font-bold mb-4 text-primary-dark">Crear cita</h3>
      <Form :validation-schema="appointmentCreateSchema" @submit="onSubmit" class="space-y-4">
        <div>
          <label class="block text-gray-700 font-mont font-medium">Fecha</label>
          <input
            type="text"
            :value="date"
            disabled
            class="w-full rounded border px-3 py-2 mt-1 font-sans text-black bg-gray-100"
          />
        </div>
        <div>
          <label class="block text-gray-700 font-mont font-medium">Servicios</label>
          <Field
            name="service_ids"
            as="select"
            multiple
            class="w-full rounded border px-3 py-2 mt-1 font-sans text-black"
          >
            <option v-for="s in services" :key="s.id" :value="s.id">{{ s.name }}</option>
          </Field>
          <ErrorMessage name="service_ids" class="text-danger text-xs mt-1" />
        </div>
        <div>
          <label class="block text-gray-700 font-mont font-medium">Notas</label>
          <Field name="notes" as="textarea" class="w-full rounded border px-3 py-2 mt-1 font-sans text-black" />
          <ErrorMessage name="notes" class="text-danger text-xs mt-1" />
        </div>
        <div class="flex justify-end gap-2">
          <button type="button" @click="emit('close')" class="btn btn-secondary">Cancelar</button>
          <button type="submit" class="btn btn-primary" :disabled="isCreating">
            {{ isCreating ? 'Creando...' : 'Crear' }}
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
