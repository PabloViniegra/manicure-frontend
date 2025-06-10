<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'

const checkRef = ref<HTMLElement | null>(null)
const pathRef = ref<SVGPathElement | null>(null)

onMounted((): void => {
  if (pathRef.value) {
    const length = pathRef.value.getTotalLength()
    pathRef.value.style.strokeDasharray = length.toString()
    pathRef.value.style.strokeDashoffset = length.toString()
    gsap.to(pathRef.value, {
      strokeDashoffset: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.15,
    })
    gsap.fromTo(
      checkRef.value,
      { scale: 0.7, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(2)', delay: 0.1 },
    )
  }
})
</script>
<template>
  <div class="fixed inset-0 flex items-center justify-center z-[9999] pointer-events-none">
    <svg
      ref="checkRef"
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      class="drop-shadow-lg"
    >
      <circle cx="48" cy="48" r="44" stroke="#22c55e" stroke-width="6" fill="#ecfdf5" />
      <path
        ref="pathRef"
        d="M30 51 L44 65 L66 38"
        stroke="#22c55e"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="none"
      />
    </svg>
  </div>
</template>
