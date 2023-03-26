<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="model" class="modal-mask" @click="model = false">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <MHButton class="modal-default-button" @click="model = false">{{
                textButton
              }}</MHButton>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script src="./modal.ts" />
<style src="./modal.css" scoped />
