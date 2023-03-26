<template>
  <div :class="cls.container">
    <input
      :class="[
        { [cls.input__error]: isNotFirstRender && isShowError },
        cls.input,
      ]"
      :placeholder="placeholder"
      v-model="model"
      @blur="checkError(model)"
    />
    <div v-if="isNotFirstRender && isShowError" :class="cls.error">
      {{ validationText }}
    </div>
  </div>
</template>

<script src="./input.ts" />
