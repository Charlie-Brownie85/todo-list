<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
    value?: string | boolean;
    modelValue?: boolean;
    inputId: string;
    disabled?: boolean;
  }>(), {
  value: '',
  modelValue: false,
  disabled: false,
});

const emit = defineEmits(['update:modelValue']);

const isChecked = computed(() => props.modelValue === true);

const updateModelValue = (event: Event) => {
  const { checked } = event.target as HTMLInputElement;
  emit('update:modelValue', checked);
};

</script>
<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :id="inputId"
      :checked="isChecked"
      :value="props.value"
      :disabled="props.disabled"
      v-bind="$attrs"
      @change="updateModelValue"
    >
    <label
      :for="inputId"
      class="checkbox__label"
    >
      <div class="checkbox__square">
        <!-- <component
          :is="getIcon"
          width="13"
          height="9"
          class="checkbox__check"
        /> -->
      </div>
      <slot />
    </label>
  </div>
</template>
<style scoped lang="postcss">
.checkbox {
  position: relative;

  input {
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  &__label {
    @apply flex items-baseline cursor-pointer;
  }

  &__square {
    @apply w-5 h-5 rounded flex-shrink-0 bg-base-100 border border-base-400 flex items-center justify-center transition-colors duration-200;
  }

  &__check {
    display: block;
    width: 65%;
    opacity: 0;
    @apply text-white transition-opacity duration-200;
  }
}
</style>
