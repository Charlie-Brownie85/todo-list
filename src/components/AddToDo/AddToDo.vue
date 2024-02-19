<script setup lang="ts">
import { ref } from 'vue';

import { v4 as uuidv4 } from 'uuid';

import { useTodosStore } from '@/stores/todos.ts';

const { addToDo } = useTodosStore();
const todoText = ref('');

function addNewTodo() {
  const newTodo = {
    id: uuidv4(),
    text: todoText.value,
    completed: false,
  };
  addToDo(newTodo);
  todoText.value = '';
}

</script>
<template>
  <input type="text" v-model="todoText" />
  <button @click="addNewTodo">Add</button>
</template>
