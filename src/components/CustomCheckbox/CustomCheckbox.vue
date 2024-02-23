<script setup lang="ts">
const props = withDefaults(defineProps<{
      value?: string | boolean;
      modelValue?: boolean;
      inputId: string;
      disabled?: boolean;
      checkColor?: string;
      size?: 'normal' | 'small';
    }>(), {
  value: '',
  modelValue: false,
  disabled: false,
  checkColor: '#3EBB59',
  size: () => 'normal',
});

const emit = defineEmits(['update:modelValue']);

</script>
<template>
  <div class="checkbox">
    <input
      type="checkbox"
      :id="inputId"
      :checked="props.modelValue"
      :value="props.value"
      :disabled="props.disabled"
      v-bind="$attrs"
      @change="emit('update:modelValue', ($event?.target as HTMLInputElement)?.checked)"
    >
    <label
      :for="inputId"
      class="checkbox__label"
    >
      <div
        class="checkbox__square"
        :class="{'checkbox__square--small': props.size === 'small'}"
      >
        <div class="svg-container">
          <svg
            class="checkbox__check"
            viewbox="0 0 32 32"
          >
            <path
              d="M4,11 l 6,6 l 10,-10"
              fill="none"
              stroke-dasharray="24"
            />
          </svg>
        </div>
      </div>
      <div class="ml-2 min-w-0">
        <slot />
      </div>
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

    &:checked + .checkbox__label .checkbox__check path {
      stroke-dashoffset: 0;
    }
  }

  &__label {
    @apply flex items-center cursor-pointer;
  }

  &__square {
    @apply w-6 h-6 rounded flex-shrink-0 bg-base-100 border border-base-400 flex items-center justify-center transition-colors duration-200;

    &--small {
      @apply w-4 h-4;

      .svg-container {
        @apply scale-75;
      }
    }
  }

  &__check {
    @apply w-6 h-6;
    path {
      stroke-dashoffset: 24;
      transition: stroke-dashoffset 0.2s;
      stroke-width: 4;
      stroke: v-bind('props.checkColor');
    }
  }
}
</style>
