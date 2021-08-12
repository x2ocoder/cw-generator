<template id="modal-template">
<transition name="modal">
<div class="modal-mask">
  <div class="modal-wrapper">
    <div class="modal-container">

      <div class="modal-header">
        <slot name="header">
          default header
        </slot>
      </div>

      <div class="modal-body">
        <slot name="body">
          default body
        </slot>
      </div>

      <div class="modal-footer">
        <slot name="footer">
          <button class="btn btn-danger modal-default-button" @click="$emit('close')">
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
    mounted() {
      window.addEventListener("keydown", (e) => {
        if (e.keyCode === 27) {
          this.$emit('close');
        }
      });
    }
  }
</script>
