<template>
  <form @submit.prevent="submitHandler">
    <div v-if="schema.length" :class="cls.wrapper">
      <component
        v-for="item in schema"
        :key="item.name"
        :is="isDynamicSwitchCase(item)"
        :class="cls.item"
        v-model="model[item.code]"
        :options="item.value"
        :placeholder="item.name"
        :label="item.name"
        :validation="validation(item)?.reg"
        :validation-text="validation(item)?.text"
        :min="String(item.value)"
        :max="String(MaxCountSlider)"
        :is-touching="isTouchingValidation"
        @update-error="updateErrorHandler($event, item.code)"
      />
      <button ref="buttonRef" type="submit" :class="cls.button">Send</button>
    </div>
  </form>
</template>

<script src="./dynamic-form.ts" />
