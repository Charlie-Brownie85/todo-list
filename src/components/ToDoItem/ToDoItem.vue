<script setup lang="ts">
import type { Todo } from '@/declarations/types';

const props = defineProps<{ todo: Todo }>();

const emit = defineEmits(['toggle-todo', 'delete-todo']);

</script>
<template>
  <div
    class="todo flex items-center gap-4 py-2"
    :class="{'todo--completed': props.todo.completed }"
  >
    <CustomCheckbox
      :input-id="`${props.todo.id}-checkbox-${props.todo.completed ? 'completed' : 'pending'}`"
      value="completed"
      :checked="props.todo.completed"
      @update:model-value="emit('toggle-todo')"
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
