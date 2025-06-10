<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'
import MainLogo from './icons/MainLogo.vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

const { username, logout } = useAuth()
const router = useRouter()
const menuOpen = ref(false)
const titleRef = ref<HTMLElement | null>(null)

function handleLogout(): void {
  logout()
  router.push('/login')
  menuOpen.value = false
}

onMounted((): void => {
  if (titleRef.value) {
    const split = SplitText.create(titleRef.value, { type: 'chars, words' })
    gsap.from(split.chars, {
      y: 40,
      opacity: 0,
      stagger: 0.05,
      duration: 0.5,
      ease: 'back.out(2)',
    })
  }
})
</script>

<template>
  <nav
    class="w-full flex items-center justify-between py-4 px-6 rounded-2xl bg-surface/80 backdrop-blur-md shadow border border-primary/10"
  >
    <div class="flex items-center gap-3 select-none">
      <span class="inline-block">
        <MainLogo class="size-8" />
      </span>
      <span class="font-display font-extrabold text-2xl text-primary-dark tracking-tight">
        Manicure Dates
      </span>
    </div>
    <div class="flex items-center gap-6">
      <a
        class="font-mont font-medium text-sm text-primary-dark hover:text-primary transition-colors px-3 py-2 rounded"
        href="/reservas"
      >
        Reservas
      </a>
      <a
        class="font-mont font-medium text-sm text-primary-dark hover:text-primary transition-colors px-3 py-2 rounded"
        href="/about"
      >
        Sobre Nosotros
      </a>
      <div class="relative" v-click-outside="() => (menuOpen = false)">
        <button
          class="flex items-center gap-2 px-3 py-2 bg-white/60 border border-primary/20 rounded-xl shadow hover:bg-primary/10 transition-all"
          @click="menuOpen = !menuOpen"
        >
          <span
            class="inline-flex items-center justify-center rounded-full bg-primary text-white font-bold w-8 h-8 text-lg"
          >
            {{ username?.charAt(0).toUpperCase() ?? 'U' }}
          </span>
          <span class="font-mont text-sm text-primary-dark">{{ username }}</span>
          <svg
            class="w-5 h-5 ml-1 text-primary-dark"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
        <transition name="fade">
          <div
            v-if="menuOpen"
            class="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-primary/20 py-2 z-50 animate-fade-in"
          >
            <button
              class="w-full text-left px-4 py-2 hover:bg-primary/10 text-primary-dark font-mont"
              @click="handleLogout"
            >
              Cerrar sesión
            </button>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
