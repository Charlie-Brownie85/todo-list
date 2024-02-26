<script setup lang="ts">
import { computed } from 'vue';

import type { Todo } from '@/declarations/types';

const props = defineProps<{ todo: Todo }>();

const emit = defineEmits(['toggle-todo', 'delete-todo']);

const isChecked = computed({
  get: () => props.todo.completed,
  set: (value: boolean) => {
    emit('toggle-todo', value);
  },
});

</script>
<template>
  <div
    class="todo flex items-center gap-4 p-2 rounded-sm"
    :class="{'todo--completed': props.todo.completed }"
  >
    <CustomCheckbox
      :input-id="`${props.todo.id}-checkbox-${props.todo.completed ? 'completed' : 'pending'}`"
      value="completed"
      v-model:checked="isChecked"
    />
    <div class="w-full">
      <span
        class="todo-text text-xl font-medium px-1"
      >
        {{ props.todo.text }}
      </span>
    </div>
    <button
      type="button"
      class="border bg-state-error-300 border-state-error-500 rounded p-[0.125rem] opacity-40 hover:opacity-100 transition-opacity"
      @click="$emit('delete-todo')"
      data-testid="delete-todo"
    >
      <SVGIcon
        name="trash"
        color="red"
        class="w-4 h-4"
      />
    </button>
  </div>
</template>
<style scoped lang="postcss">
.todo {
  box-shadow: -6px 16px 6px -22px rgba(0, 0, 0, 0.1),
    9px 5px 18px -9px rgba(0, 0, 0, 0.1);

  &-text {
    position: relative;
    opacity: 1;
    user-select: none;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 0%;
      height: 2px;
      margin-top: 1px;
      transform: translateY(-50%);
      @apply bg-base-900;
      transition: width 0.15s;
    }
  }

  &--completed .todo-text {
    opacity: 0.6;

    &::after {
    width: 100%;
    }
  }
}
</style>
