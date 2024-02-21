<script setup lang="ts">
import type { Todo } from '@/declarations/types';

const props = defineProps<{ todo: Todo }>();

const emit = defineEmits(['toggle']);

</script>
<template>
  <div class="flex items-center gap-4 p-4">
    <CustomCheckbox
      :input-id="`${props.todo.id}-checkbox`"
      :value="props.todo.completed"
      @update:model-value="emit('toggle')"
    />
    <div class="w-full">
      <span
        :class="{ 'todo-text--completed': props.todo.completed}"
        class="todo-text text-xl font-medium px-1"
      >
        {{ props.todo.text }}
      </span>
    </div>
    <button
      type="button"
      class="border bg-state-error-300 border-state-error-500 p-2 text-xxs"
    >
      X
    </button>
  </div>
</template>
<style scoped lang="postcss">
.todo-text {
  position: relative;
  opacity: 1;

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

  &--completed {
    opacity: 0.6;

    &::after {
    width: 100%;
    }
  }
}
</style>
