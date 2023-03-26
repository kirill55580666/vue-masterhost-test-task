<template>
  <div :class="cls.container">
    <div :class="cls.block">
      <div :class="cls.title">
        <span :class="cls.brand">{{ brand }}</span>
        <span :class="cls.name">{{ name }}</span>
      </div>
      <img :class="cls.image" :src="BikePng" alt="Фото продукта" />
    </div>
    <div :class="[cls.block]">
      <div :class="cls.wrapper">
        <template v-if="properties.length">
          <div :class="cls.properties">
            <div
              v-for="item in properties"
              :key="item.name"
              :class="cls.property"
            >
              <span>{{ item.name }}</span>
              <TextTooltip :text="item.value" />
            </div>
          </div>
        </template>
        <MHSelect
          v-if="colors.length"
          :options="colors"
          v-model="color"
          label="Выбор цвета"
          :class="cls.select"
        />
        <div :class="cls.price">
          Цена <span :class="cls.price__currency">{{ formattedPrice }}</span>
        </div>
        <div :class="cls.button" @click="isShowModal = true">
          <MHButton>Купить</MHButton>
        </div>
      </div>
    </div>
  </div>
  <MHModal v-model:is-show="isShowModal">
    <template #header
      ><div :class="cls.header">Оформление покупки</div></template
    >
    <template #body>
      <MHDynamicForm
        v-if="!isShowSuccessBlock"
        :preFilledData="{ color: color }"
        @updateData="updateDataHandler($event)"
        ref="formRef"
        :schema="parameters"
      />
      <div v-else>Покупка успешна завершена</div>
    </template>
    <template #footer>
      <MHButton
        v-if="!isShowSuccessBlock"
        :class="cls.submitButton"
        @click="submitHandler"
      >
        Оформить
      </MHButton>
    </template>
  </MHModal>
</template>

<script src="./product-block.ts" />
