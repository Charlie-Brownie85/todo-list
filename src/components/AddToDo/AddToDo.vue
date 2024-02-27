<script setup lang="ts">
import { ref, computed } from 'vue';

import { v4 as uuidv4 } from 'uuid';

import i18n from '@/i18n';

import { placeholderExamples } from '@/config/placeholder-examples';

import { useTodosStore } from '@/stores/todos';

const { addToDo } = useTodosStore();
const todoText = ref('');
const { t } = i18n.global;
const placeholderExample = ref(t(placeholderExamples[Math.floor(Math.random() * placeholderExamples.length)]));
const placeholder = computed(() => `e.g. ${placeholderExample.value}`);

function clearTodoText() {
  todoText.value = '';
  placeholderExample.value = t(placeholderExamples[Math.floor(Math.random() * placeholderExamples.length)]);
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
  <div class="w-full flex gap-3 justify-center">
    <input
      class="w-full max-w-md text-base-900 dark:text-white"
      type="text"
      name="new-todo-input"
      v-model="todoText"
      :placeholder="placeholder"
      @keypress="submitToDo"
    >
    <button
      type="button"
      :disabled="!todoText?.length"
      @click="addNewTodo"
    >
      <span class="text-white dark:text-base-800">{{ $t('Add') }}</span>
    </button>
  </div>
</template>
<style scoped lang="postcss">
input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;

  &::placeholder {
    @apply text-base-700;
  }
}

button {
  @apply min-w-16 border border-solid border-state-info-700 bg-state-info-500 transition-all duration-200 rounded-lg p-2 cursor-pointer;

  @screen md {
    @apply min-w-24;
  }

  &:hover,
  &:focus {
    @apply bg-state-info-700 border-state-info-900;
  }

  &:active {
    @apply bg-state-info-900;
  }

  &:disabled {
    @apply bg-state-info-300 border-base-400 cursor-not-allowed;
  }

  span {
    @apply text-white font-bold;
  }
}

.dark {
  input::placeholder {
    @apply text-base-500;
  }

  button {
    @apply border-base-700 bg-base-300;

    &:hover:not(:disabled),
    &:focus:not(:disabled) {
      @apply bg-base-500;
    }

    &:disabled {
      opacity: 0.6;
      @apply cursor-not-allowed;
    }
  }
}
</style>
