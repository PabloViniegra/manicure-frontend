<script setup lang="ts">
import { Form } from 'vee-validate'
import { useAppointments } from '@/composables/useAppointments'

const props = defineProps<{
  show: boolean
  appointmentId: number
}>()

const emit = defineEmits<{ (e: 'close'): void }>()

const { deleteAppointment, isDeleting } = useAppointments()

async function onSubmit(): Promise<void> {
  try {
    await deleteAppointment(props.appointmentId)
    emit('close')
  } catch (error) {
    console.error('Error deleting appointment:', error)
  }
}
</script>
<template>
  <Teleport to="body"
    >P
    <div v-if="props.show" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-3/6 max-w-none flex flex-col justify-center">
        <h3 class="text-2xl font-extrabold font-display mb-4 text-primary-dark text-center">
          Eliminar cita
        </h3>
        <div>
          <p class="text-gray-700 mb-4 font-sans text-center">
            ¿Estás seguro de que quieres eliminar esta cita?
          </p>
          <Form @submit="onSubmit" class="space-y-4">
            <div class="flex justify-center space-x-12">
              <button
                type="button"
                class="btn btn-text btn-secondary font-mont"
                @click="emit('close')"
              >
                Cancelar
              </button>
              <button
                type="submit"
                class="btn btn-primary waves waves-light font-mont"
                :disabled="isDeleting"
              >
                Eliminar
                <span v-if="isDeleting" class="loading loading-spinner loading-sm space-x-2"></span>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </Teleport>
</template>
