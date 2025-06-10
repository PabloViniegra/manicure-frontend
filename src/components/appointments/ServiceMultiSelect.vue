<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick, watch } from 'vue'
import type { ServiceSimple } from '@/types/types'
import gsap from 'gsap'

interface Props {
  modelValue: number[]
  options: ServiceSimple[]
  placeholder?: string
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'update:modelValue', value: number[]): void }>()

const open = ref(false)
const wrapper = ref<HTMLElement | null>(null)
const menuRef = ref<HTMLElement | null>(null)

const selectedOptions = computed((): ServiceSimple[] =>
  props.options.filter((o): boolean => props.modelValue.includes(o.id)),
)

function toggle(): void {
  open.value = !open.value
}

function onClickOutside(event: MouseEvent): void {
  if (wrapper.value && !wrapper.value.contains(event.target as Node)) {
    open.value = false
  }
}

watch(open, async (show): Promise<void> => {
  await nextTick()
  if (!menuRef.value) return

  if (show) {
    gsap.fromTo(
      menuRef.value,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' },
    )
  } else {
    gsap.to(menuRef.value, { opacity: 0, y: -20, duration: 0.2, ease: 'power2.in' })
  }
})

function onCheck(id: number, event: Event): void {
  const checked = (event.target as HTMLInputElement).checked
  let next = props.modelValue.slice()
  if (checked) {
    if (!next.includes(id)) next.push(id)
  } else {
    next = next.filter((val): boolean => val !== id)
  }
  emit('update:modelValue', next)
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
        ref="menuRef"
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
            :checked="props.modelValue.includes(option.id)"
            @change="onCheck(option.id, $event)"
            @click.stop
          />
          <span>{{ option.name }}</span>
        </li>
      </ul>
    </transition>
  </div>
</template>
