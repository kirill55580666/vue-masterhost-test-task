<template>
  <select :class="cls.select" v-model="model">
    <option disabled>{{ label }}</option>
    <option v-for="option in options" :key="option">{{ option }}</option>
  </select>
</template>

<script src="./select.ts" />
