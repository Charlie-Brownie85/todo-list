<script setup lang="ts">
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';

import { useTodosStore } from '@/stores/todos';

const todosStore = useTodosStore();

const {
  toggleToDo,
  removeToDo,
  completeAllToDos,
  uncheckedToDos,
  clearCompletedTodos,
} = todosStore;
const { todos } = storeToRefs(todosStore);

const pendingToDos = computed(() => todos.value.filter((todo) => !todo.completed));
const doneToDos = computed(() => todos.value.filter((todo) => todo.completed));

function toggleAllTodos(val: boolean) {
  if (val) {
    completeAllToDos();
  } else {
    uncheckedToDos();
  }
}

/**
 * All this logic below is needed due how Vue Transitions handle the leaving/entering item
 * It's a bit tricky to handle the transition when an item is being removed,
 * as once it's completed status changes Vue removes it from the DOM and what's left doesn't reflect its
 * internal animations like the strikethrough effect.
 */
const isItemBeingRemoved = ref(false);

function removeItem(id: string) {
  isItemBeingRemoved.value = true;
  removeToDo(id);
}

function addCompletedClass(el: Element) {
  if (isItemBeingRemoved.value) {
    isItemBeingRemoved.value = false;
    return;
  }
  if (el.firstChild instanceof HTMLElement) {
    el.firstChild.classList.add('todo--completed');
  }
}

function removeCompletedClass(el: Element) {
  if (isItemBeingRemoved.value) {
    isItemBeingRemoved.value = false;
    return;
  }
  if (el.firstChild instanceof HTMLElement) {
    el.firstChild.classList.remove('todo--completed');
  }
}
</script>

<template>
  <div class="py-3 mt-5 overflow-hidden px-2 w-full max-w-[45rem]">
    <Transition
      name="all-clear"
      mode="out-in"
    >
      <div v-if="todos.length">
        <CustomCheckbox
          input-id="complete-all-checkbox"
          value="complete-all"
          :checked="!pendingToDos.length"
          size="small"
          class="mb-2"
          @update:model-value="toggleAllTodos"
        >
          <span class="text-xs text-base-700 dark:text-base-400 italic">
            {{ !pendingToDos.length ? $t('uncheck all tasks') : $t('complete all tasks') }}
          </span>
        </CustomCheckbox>
        <Transition
          name=""
          mode="out-in"
        >
          <div v-if="pendingToDos.length">
            <TransitionGroup
              name="pending-list"
              tag="ul"
              class="space-y-2"
              @before-leave="addCompletedClass"
            >
              <li
                v-for="todo in pendingToDos"
                :key="`${todo.id}--pending`"
              >
                <ToDoItem
                  :todo="todo"
                  @toggle-todo="toggleToDo(todo.id)"
                  @delete-todo="removeItem(todo.id)"
                />
              </li>
            </TransitionGroup>
          </div>
          <p
            v-else
            class="text-center text-xl italic font-bold text-base-700 dark:text-base-100 py-4 mb-3"
          >
            {{ $t('Great! No pending chores!') }}
          </p>
        </Transition>
        <div
          class="border-t-2 border-base-400 pt-4 mt-4"
          :class="{'border-t-0': !doneToDos.length}"
        >
          <div class="flex justify-end mb-2">
            <button
              v-if="doneToDos.length"
              type="button"
              class="border-2 bg-state-warning-300 border-state-warning-500 rounded p-[0.125rem] opacity-40 hover:opacity-100 transition-opacity"
              @click="clearCompletedTodos"
              data-testid="clear-all-todos"
            >
              <SVGIcon
                name="clean"
                color="goldenrod"
                class="w-6 h-6"
              />
            </button>
          </div>
          <TransitionGroup
            name="done-list"
            tag="ul"
            class="space-y-2"
            @before-leave="removeCompletedClass"
          >
            <li
              v-for="todo in doneToDos"
              :key="`${todo.id}--done`"
            >
              <ToDoItem
                :todo="todo"
                @toggle-todo="toggleToDo(todo.id)"
                @delete-todo="removeItem(todo.id)"
              />
            </li>
          </TransitionGroup>
        </div>
      </div>
      <p
        v-else
        class="text-center text-xl italic font-bold text-base-700 dark:text-base-100 py-2"
      >
        {{ $t('Start adding tasks!') }}
      </p>
    </Transition>
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

.all-clear-enter-active,
.all-clear-leave-active {
  transition: all 0.3s ease;
}

.all-clear-enter-from,
.all-clear-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.pending-list-enter-from,
.pending-list-leave-to,
.done-list-enter-from,
.done-list-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.-enter-active,
.-leave-active {
  transition: all 0.5s ease;
}

.-enter-from,
.-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
