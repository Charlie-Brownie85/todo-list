<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useTodosStore } from '@/stores/todos';

const todosStore = useTodosStore();

const { toggleToDo, removeToDo } = todosStore;
const { todos } = storeToRefs(todosStore);

const pendingToDos = computed(() => todos.value.filter((todo) => !todo.completed));
const doneToDos = computed(() => todos.value.filter((todo) => todo.completed));

function addCompletedClass(el) {
  el.firstChild.classList.add('todo--completed');
}

function removeCompletedClass(el) {
  el.firstChild.classList.remove('todo--completed');
}
</script>

<template>
  <div class="py-3 mt-5 overflow-hidden">
    <Transition
      name="all-done"
      mode="out-in"
    >
      <TransitionGroup
        v-if="pendingToDos.length"
        name="pending-list"
        tag="ul"
        @before-leave="addCompletedClass"
      >
        <li
          v-for="todo in pendingToDos"
          :key="`${todo.id}--pending`"
        >
          <ToDoItem
            :todo="todo"
            @toggle-todo="toggleToDo(todo.id)"
            @delete-todo="removeToDo(todo.id)"
          />
        </li>
      </TransitionGroup>
      <p
        v-else
        class="text-center text-xl italic font-bold text-base-700 py-2"
      >
        Great! No pending chores!
      </p>
    </Transition>
    <TransitionGroup
      name="done-list"
      tag="ul"
      @before-leave="removeCompletedClass"
    >
      <li
        v-for="todo in doneToDos"
        :key="`${todo.id}--done`"
      >
        <ToDoItem
          :todo="todo"
          @toggle-todo="toggleToDo(todo.id)"
          @delete-todo="removeToDo(todo.id)"
        />
      </li>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="postcss">
.pending-list-move,
.done-list-move,
.pending-list-enter-active,
.done-list-enter-active,
.pending-list-leave-active,
.done-list-leave-active {
  transition: all 0.5s ease 0.15s;
}

.pending-list-enter-from,
.pending-list-leave-to,
.done-list-enter-from,
.done-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.all-done-enter-active,
.all-done-leave-active {
  transition: all 0.5s ease;
}

.all-done-enter-from,
.all-done-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
