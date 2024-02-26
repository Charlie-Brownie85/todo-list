<script setup lang="ts">
</script>

<template>
  <main class="p-4">
    <div class="flex justify-end">
      <DarkMode />
    </div>
    <h1 class="font-bold text-3xl text-center mb-4 text-base-900 dark:text-base-100">
      To Do list:
    </h1>
    <AddToDo />
    <div class="flex justify-center">
      <ToDosList />
    </div>
  </main>
</template>
