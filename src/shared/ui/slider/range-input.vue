<template>
  <div class="fi-range-input">
    <div class="fi-range-input__value">{{ modelValue }}</div>
    <input
      class="fi-range-input__input"
      type="range"
      step="1"
      :style="{ background: rangeInputBackground }"
      :min="min"
      :max="max"
      :value="modelValue"
      @input="updateModelValue"
    />
    <div class="fi-range-input__max-value-indicator">
      {{ max }}
    </div>
  </div>
</template>

<script lang="ts" src="./range-input.ts"></script>
<style src="./range-input.css" scoped></style>
