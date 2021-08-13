<template id="modal-template">
<transition name="modal">
<div class="modal modal-mask" tabindex="-1">
  <div class=" modal-dialog modal-wrapper">
    <div class="modal-content modal-container">

      <div class="modal-header">
        <slot name="header" class="modal-title">
          default header
        </slot>
        <button type="button" class="btn-close" @click="$emit('closeModal', id)"></button>
      </div>

      <div class="modal-body">
        <slot name="body">
          default body
        </slot>
      </div>

      <div class="modal-footer">
        <slot name="footer">
          <button class="btn btn-danger modal-default-button" @click="$emit('closeModal', id)">
            Close
          </button>
        </slot>
      </div>
    </div>
  </div>
</div>
</transition>
</template>

<style src="../assets/css/modal.css"></style>

<script>
  export default {
    name: 'ModalComponent',
    template: '#modal-template',
    props: {
      id: String
    },
    mounted() {
      window.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) {
          this.$emit('closeModal', this.id);
        }
      });
    },
  }
</script>
