<script setup lang="ts">
import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'
import type { ServiceSimple } from '@/types/types'

interface Props {
  modelValue: number[]
  options: ServiceSimple[]
  placeholder?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', value: number[]): void }>()

const open = ref(false)
const localValue = ref<number[]>(props.modelValue ?? [])
const wrapper = ref<HTMLElement | null>(null)

watch(
  (): number[] => props.modelValue,
  (val): void => {
    localValue.value = val ?? []
  },
)

watch(localValue, (val): void => {
  emit('update:modelValue', val)
})

const selectedOptions = computed((): ServiceSimple[] =>
  props.options.filter((o): boolean => localValue.value.includes(o.id)),
)

function toggle(): void {
  open.value = !open.value
}

function onClickOutside(event: MouseEvent): void {
  if (wrapper.value && !wrapper.value.contains(event.target as Node)) {
    open.value = false
  }
}

function onCheck(id: number, event: Event): void {
  const checked = (event.target as HTMLInputElement).checked
  if (checked) {
    if (!localValue.value.includes(id)) localValue.value.push(id)
  } else {
    localValue.value = localValue.value.filter((val): boolean => val !== id)
  }
  emit('update:modelValue', [...localValue.value])
}

onMounted((): void => {
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount((): void => {
  document.removeEventListener('click', onClickOutside)
})
</script>
<template>
  <div class="relative" ref="wrapper">
    <div
      class="w-full rounded border px-3 py-2 mt-1 font-sans text-black bg-white flex flex-wrap gap-1 cursor-pointer"
      @click="toggle"
    >
      <template v-if="selectedOptions.length">
        <span
          v-for="opt in selectedOptions"
          :key="opt.id"
          class="bg-primary text-white text-xs rounded px-2 py-1"
        >
          {{ opt.name }}
        </span>
      </template>
      <span v-else class="text-gray-400">{{ placeholder }}</span>
    </div>
    <transition name="fade">
      <ul
        v-if="open"
        class="absolute z-10 w-full bg-white border rounded mt-1 max-h-60 overflow-auto shadow-lg"
      >
        <li
          v-for="option in options"
          :key="option.id"
          class="px-3 py-2 hover:bg-primary-light flex items-center gap-2 cursor-pointer"
        >
          <input
            type="checkbox"
            class="accent-primary"
            :value="option.id"
            :checked="localValue.includes(option.id)"
            @change="onCheck(option.id, $event)"
            @click.stop
          />
          <span>{{ option.name }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
