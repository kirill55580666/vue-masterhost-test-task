<template>
  <div :class="cls.page">
    <template v-if="products.length">
      <ProductBlock
        v-for="product in products"
        :key="product.unitCode"
        :code="product.unitCode"
        :brand="product.brand"
        :name="product.name"
        :properties="product.properties"
        :parameters="product.parameters"
        :price="product.unitPrice"
      />
    </template>
  </div>
</template>

<script src="./main-page.ts" />
