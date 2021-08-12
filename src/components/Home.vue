<template>
  <!-- NAV -->
  <CustomNav v-model:address="address"/>

  <!-- JUMBOTRON -->
  <div class="mb-0 juno-gradient text-white">
    <div class="container p-5">
      <h1 class="display-5 fw-bold">Create your CW20 Token</h1>

      <p class="lead">
        Easily deploy Smart Contract for a Standard, Capped, Mintable, Burnable CW20 Token.<br>
        CW20 Generator is the easiest and fastest way to create your own CW20 token on the Juno network. No coding skills are required.
      </p>
    </div>
  </div>

  <!-- FORM -->
  <ContractForm
      v-model:address="address"
      v-model:shared-entity="sharedEntity"
      v-model:contract="contract"
      @open="showModal"
  />

  <!-- MODAL -->
  <modal v-if="is_modal_enabled" @close="hideModal">
    <template v-slot:header><h4>Transaction details</h4></template>
    <template v-slot:body>
      <p>Contract address: {{contract.address}}</p>
      <p>Tx hash: {{contract.transaction_hash}}</p>
    </template>
  </modal>
</template>

<script>
  import KeplrConnection from "../services/KeplrConnection"
  import CustomNav from './Nav'
  import ContractForm from './ContractForm'
  import Modal from './Modal'
  import ContractFormEntity from "../entities/ContractFormEntity"

  export default {
    name: "Home",
    components: {
      CustomNav,
      ContractForm,
      Modal
    },
    provide: { keplr: KeplrConnection },
    data() {
      return {
        is_modal_enabled: false,
        address: '',
        sharedEntity: ContractFormEntity,
        contract: {
          address: '',
          transaction_hash: '',
        }
      }
    },
    mounted() {
      window.addEventListener("keplr_keystorechange", async () => {
        this.keplr = await KeplrConnection.selfUpdate();
        this.address = this.keplr.address;
      });
    },
    methods: {
      showModal() {
        this.is_modal_enabled = true;
      },
      hideModal() {
        this.is_modal_enabled = false;
      }
    }
  }
</script>
