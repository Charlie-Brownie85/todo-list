<script setup lang="ts">
import type { ToDo } from '@/types/todo';

defineProps<{ todo: ToDo }>();

</script>
<template>
  <div class="flex items-center justify-between p-4 border-b">
    <p class="text-lg">{{ todo.text }}</p>
    <input type="checkbox" v-model="todo.completed" />
  </div>
</template>
