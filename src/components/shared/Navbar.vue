<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'
import NavbarWithCreds from '@/components/shared/NavbarWithCreds.vue'
import NavbarWithoutCreds from '@/components/shared/NavbarWithoutCreds.vue'

const { isAuthenticated } = useAuth()
</script>
<template>
  <NavbarWithCreds v-if="isAuthenticated" />
  <NavbarWithoutCreds v-else />
</template>
