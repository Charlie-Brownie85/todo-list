<script setup lang="ts">
import { computed } from 'vue';

import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark({ disableTransition: false }); // by default, useDark() disables transitions
const toggleDark = useToggle(isDark);

const iconName = computed(() => (isDark.value ? 'light-mode' : 'dark-mode'));
const iconColor = computed(() => (isDark.value ? '#FBFBFB' : 'black'));
</script>

<template>
  <button
    @click="toggleDark()"
    class="flex justify-center items-center p-2 rounded bg-base-400 dark:bg-base-700 dark:hover:bg-base-500 hover:bg-base-500 min-w-8 min-h-8"
  >
    <SVGIcon
      :name="iconName"
      :key="iconName"
      :color="iconColor"
      class="w-4 h-4"
    />
  </button>
</template>

<style lang="postcss" scoped>

</style>
