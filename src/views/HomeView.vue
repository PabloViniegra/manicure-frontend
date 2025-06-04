<script setup lang="ts">
import Layout from '@/layout/Layout.vue'
import Navbar from '@/components/shared/Navbar.vue'
import Calendar from '@/components/dates/Calendar.vue'
</script>
<template>
  <Layout>
    <template #header>
      <Navbar />
    </template>
    <div class="py-8 px-4 max-w-6xl mx-auto">
      <Calendar />
    </div>
  </Layout>
</template>
