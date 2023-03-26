<template>
  <div :class="cls.container">
    <div :class="cls.content">
      <div>{{ formattedText }}</div>
      <div v-if="text.length > MaxChars" :class="cls.icon">
        <img :class="cls.image" :src="DotsPng" alt="..." />
        <div :class="cls.tip">{{ text }}</div>
      </div>
    </div>
  </div>
</template>

<script src="./text-tooltip.ts" />
