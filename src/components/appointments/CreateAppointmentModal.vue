<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { appointmentCreateSchema } from '@/types/schemas'
import { useServices } from '@/composables/useServices'
import { useAppointments } from '@/composables/useAppointments'
import { useAuth } from '@/composables/useAuth'
import { ref, watch } from 'vue'
import type { AppointmentCreate } from '@/types/types'
import ServiceMultiSelect from './ServiceMultiSelect.vue'

const props = defineProps<{
  show: boolean
  date: string
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const { services } = useServices()
const { createAppointment, isCreating } = useAppointments()
const { me } = useAuth()

const editedDate = ref(props.date)
watch(
  (): string => props.date,
  (val): void => {
    editedDate.value = val
  },
)

async function onSubmit(values: any): Promise<void> {
  if (!me.value) return
  const appointment: AppointmentCreate = {
    client_id: me.value.client_id,
    date: editedDate.value,
    notes: values.notes,
    service_ids: values.service_ids.map((id: string): number => Number(id)),
  }
  await createAppointment(appointment)
  emit('close')
}
</script>
<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-3/6 max-w-none flex flex-col justify-center">
        <h3 class="text-xl font-bold font-display mb-4 text-primary-dark">Crear cita</h3>
        <Form :validation-schema="appointmentCreateSchema" @submit="onSubmit" class="space-y-4">
          <div>
            <label class="block text-gray-700 font-mont font-medium">Fecha</label>
            <Field
              name="date"
              as="input"
              type="text"
              v-model="editedDate"
              class="w-full rounded border px-3 py-2 mt-1 font-sans text-black bg-white"
              :validateOnInput="true"
              placeholder="YYYY-MM-DD HH:mm"
            />
            <ErrorMessage name="date" class="text-danger text-xs mt-1" />
          </div>
          <div>
            <label class="block text-gray-700 font-mont font-medium">Servicios</label>
            <Field name="service_ids" :as="ServiceMultiSelect" :options="services" placeholder="Selecciona servicios" />
            <ErrorMessage name="service_ids" class="text-danger text-xs mt-1" />
          </div>
          <div>
            <label class="block text-gray-700 font-mont font-medium">Notas</label>
            <Field
              name="notes"
              as="textarea"
              class="w-full rounded border px-3 py-2 mt-1 font-sans text-black"
            />
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
  </Teleport>
</template>
