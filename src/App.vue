<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useTodosStore } from './stores/todos';

const { todos } = storeToRefs(useTodosStore());
</script>

<template>
  <main class="p-4">
    <h1 class="font-bold text-3xl text-center mb-4">
      To Do list:
    </h1>
    <AddToDo />
    <div
      v-for="todo in todos"
      :key="todo.id"
    >
      <ToDoItem :todo="todo" />
    </div>
  </main>
</template>
