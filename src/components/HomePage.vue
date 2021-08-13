<template>
  <!-- NAV -->
  <custom-nav v-model:address="address"/>

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
  <contract-form
      v-model:address="address"
      :shared-entity="sharedEntity"
      :contract="contract"
      @update:shared-entity="setSharedEntity($event)"
      @update:contract="setContract($event)"
      @open-modal="showModal($event)"
  />

  <!-- MODALS -->
  <transaction-details
      v-if="is_transaction_details_modal_enabled"
      :id="'is_transaction_details_modal_enabled'"
      :shared-entity="sharedEntity"
      :contract="contract"
      @close-modal="hideModal($event)"
  />
  <terms-of-use
      v-if="is_terms_of_use_modal_enabled"
      :id="'is_terms_of_use_modal_enabled'"
      @close-modal="hideModal($event)"
  />
</template>

<script>
  import KeplrConnection from "../services/Keplr/KeplrConnection"
  import CustomNav from './Nav'
  import ContractForm from './ContractForm'
  import ContractEntity from "../entities/ContractEntity"
  import TransactionDetails from "./TransactionDetailsModal"
  import TermsOfUse from "./TermsOfUseModal"

  export default {
    name: "Home",
    components: {
      CustomNav,
      ContractForm,
      TransactionDetails,
      TermsOfUse
    },
    provide: { keplr: KeplrConnection },
    data() {
      return {
        is_terms_of_use_modal_enabled: false,
        is_transaction_details_modal_enabled: false,
        address: '',
        sharedEntity: ContractEntity,
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
      setSharedEntity(event) {
        this.sharedEntity = JSON.parse(JSON.stringify(event));
      },
      setContract(event) {
        this.contract = JSON.parse(JSON.stringify(event));
      },
      showModal(modalKey) {
        this[modalKey] = true;
        document.body.classList.add("modal-open");
      },
      hideModal(modalKey) {
        this[modalKey] = false;
        document.body.classList.remove("modal-open");
      },
    },
  }
</script>
