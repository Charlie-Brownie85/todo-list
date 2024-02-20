<script setup lang="ts">
import { ref, computed } from 'vue';

import { v4 as uuidv4 } from 'uuid';

import { placeholderExamples } from '@/utils/placeholder-examples';

import { useTodosStore } from '@/stores/todos.ts';

const { addToDo } = useTodosStore();
const todoText = ref('');
const placeholderExample = ref(placeholderExamples[Math.floor(Math.random() * placeholderExamples.length)]);
const placeholder = computed(() => `e.g. ${placeholderExample.value}`);

function clearTodoText() {
  todoText.value = '';
  placeholderExample.value = placeholderExamples[Math.floor(Math.random() * placeholderExamples.length)];
}

function addNewTodo() {
  const newTodo = {
    id: uuidv4(),
    text: todoText.value,
    completed: false,
  };
  addToDo(newTodo);
  clearTodoText();
}

function submitToDo(e: KeyboardEvent) {
  if (e.key === 'Enter' && todoText.value?.length) {
    addNewTodo();
  }
}

</script>
<template>
  <input
    type="text"
    v-model="todoText"
    :placeholder="placeholder"
    @keypress="submitToDo"
  />
  <button
    @click="addNewTodo"
    :disabled="!todoText.value?.length"
  >Add</button>
</template>
<style scoped lang="postcss">
input {
  padding: 0.5rem;
  margin-right: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;

  &::placeholder {
    @apply text-base-700;
  }
}
</style>
