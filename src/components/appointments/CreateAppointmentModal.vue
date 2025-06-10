<script setup lang="ts">
import { Form, Field, ErrorMessage } from 'vee-validate'
import { appointmentCreateSchema } from '@/types/schemas'
import { useServices } from '@/composables/useServices'
import { useAppointments } from '@/composables/useAppointments'
import { useAuth } from '@/composables/useAuth'
import { nextTick, ref, watch } from 'vue'
import type { AppointmentCreate } from '@/types/types'
import ServiceMultiSelect from './ServiceMultiSelect.vue'
import SuccessCheck from '../shared/SuccessCheck.vue'

const props = defineProps<{
  show: boolean
  date: string
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const { services } = useServices()
const { createAppointment, isCreating } = useAppointments()
const { me } = useAuth()

const editedDate = ref(props.date)

const showSuccess = ref<boolean>(false)
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
    service_ids: Array.isArray(values.service_ids)
      ? values.service_ids.map(Number)
      : [Number(values.service_ids)],
  }
  await createAppointment(appointment)
  showSuccess.value = true
  setTimeout((): void => {
    showSuccess.value = false
    emit('close')
  }, 1200)
}
</script>
<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-3/6 max-w-none flex flex-col justify-center">
        <h3 class="text-2xl font-extrabold font-display mb-4 text-primary-dark">Crear cita</h3>
        <Form
          :validation-schema="appointmentCreateSchema"
          @submit="onSubmit"
          class="space-y-4"
          :initial-values="{ service_ids: [] }"
          v-slot="{ meta }"
        >
          <div>
            <label class="block text-gray-700 font-mont font-medium">Fecha</label>
            <Field
              name="date"
              class="w-full rounded border px-3 py-2 mt-1 font-sans text-black bg-white"
              type="text"
              as="input"
              v-model="editedDate"
              :validateOnInput="true"
              placeholder="YYYY-MM-DD HH:mm"
            />
            <ErrorMessage name="date" class="text-danger text-xs mt-1" />
          </div>
          <div>
            <label class="block text-gray-700 font-mont font-medium">Servicios</label>
            <Field name="service_ids" v-slot="{ field, errors }">
              <ServiceMultiSelect
                :model-value="field.value"
                @update:modelValue="(val) => field.onChange(val)"
                :options="services"
                placeholder="Selecciona servicios"
              />
              <span class="text-danger text-xs mt-1">{{ errors[0] }}</span>
            </Field>
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
            <button
              type="button"
              @click="emit('close')"
              class="btn btn-text btn-secondary font-mont"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="btn btn-primary waves waves-light font-mont"
              :disabled="isCreating || !meta.valid"
            >
              {{ isCreating ? 'Creando...' : 'Crear' }}
              <span v-if="isCreating" class="loading loading-spinner loading-sm space-x-1"></span>
            </button>
          </div>
        </Form>
        <SuccessCheck v-if="showSuccess" />
      </div>
    </div>
  </Teleport>
</template>
