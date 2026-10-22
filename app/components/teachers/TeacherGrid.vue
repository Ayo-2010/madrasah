<script setup lang="ts">
import type { Teacher } from '~/types/teacher'

defineProps<{ teachers: Teacher[] }>()
</script>

<template>
  <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
    <TeacherCard
      v-for="teacher in teachers"
      :key="teacher.id"
      :teacher="teacher"
    />
  </div>
</template>
