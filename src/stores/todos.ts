import { ref, watch } from 'vue';
import { defineStore } from 'pinia';

import type { Todo } from '@/declarations/types';

export const useTodosStore = defineStore('todos', () => {
  const todos = ref<Todo[]>([]);

  if (localStorage.getItem('todos')) {
    todos.value = JSON.parse(localStorage.getItem('todos') || '[]');
  }

  function addToDo(todo: Todo) {
    todos.value.push(todo);
  }

  function removeToDo(id: string) {
    const index = todos.value.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      todos.value.splice(index, 1);
    }
  }

  function toggleToDo(id: string) {
    const todo = todos.value.find((item) => item.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  function completeAllToDos() {
    todos.value.forEach((todo: Todo) => {
      todo.completed = true;
    });
  }

  watch(todos, (newTodos) => {
    localStorage.setItem('todos', JSON.stringify(newTodos));
  }, { deep: true });

  return {
    todos,
    addToDo,
    removeToDo,
    toggleToDo,
    completeAllToDos,
  };
});
