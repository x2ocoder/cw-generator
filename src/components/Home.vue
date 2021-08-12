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
      :sharedEntity="sharedEntity"
      :contract="contract"
      @update:sharedEntity="setSharedEntity($event)"
      @update:contract="setContract($event)"
      @open="showModal"
  />

  <!-- MODAL -->
  <modal v-if="is_modal_enabled" @close="hideModal">
    <template v-slot:header><h4>Transaction details</h4></template>
    <template v-slot:body>
      <!-- Token Type -->
      <div class="row">
        <label for="tokenType" class="col-sm-4 col-form-label">Token Type</label>
        <div class="col-sm-8">
          <input type="text" readonly disabled class="form-control-plaintext" id="tokenType" :value="sharedEntity.token_type">
        </div>
      </div>
      <!-- Token Name -->
      <div class="row">
        <label for="tokenName" class="col-sm-4 col-form-label">Token Name</label>
        <div class="col-sm-8">
          <input type="text" readonly disabled class="form-control-plaintext" id="tokenName" :value="sharedEntity.token_name">
        </div>
      </div>
      <!-- Token Symbol -->
      <div class="row">
        <label for="tokenSymbol" class="col-sm-4 col-form-label">Token Symbol</label>
        <div class="col-sm-8">
          <input type="text" readonly disabled class="form-control-plaintext" id="tokenSymbol" :value="sharedEntity.token_symbol">
        </div>
      </div>
      <!-- Token decimals -->
      <div class="row">
        <label for="tokenDecimals" class="col-sm-4 col-form-label">Token decimals</label>
        <div class="col-sm-8">
          <input type="number" readonly disabled class="form-control-plaintext" id="tokenDecimals" :value="sharedEntity.token_decimals">
        </div>
      </div>
      <!-- Initial Supply -->
      <div class="row">
        <label for="initialSupply" class="col-sm-4 col-form-label">Initial Supply</label>
        <div class="col-sm-8">
          <input type="number" readonly disabled class="form-control-plaintext" id="initialSupply" :value="sharedEntity.initial_supply">
        </div>
      </div>
      <!-- Total Supply -->
      <div class="row" v-if="sharedEntity.total_supply">
        <label for="totalSupply" class="col-sm-4 col-form-label">Total Supply</label>
        <div class="col-sm-8">
          <input type="number" readonly disabled class="form-control-plaintext" id="totalSupply" :value="sharedEntity.total_supply">
        </div>
      </div>
      <!-- Supply Type -->
      <div class="row">
        <label for="supplyType" class="col-sm-4 col-form-label">Supply Type</label>
        <div class="col-sm-8">
          <input type="text" readonly disabled class="form-control-plaintext" id="supplyType" :value="sharedEntity.supply_type">
        </div>
      </div>
      <!-- Access Type -->
      <div class="row">
        <label for="accessType" class="col-sm-4 col-form-label">Access Type</label>
        <div class="col-sm-8">
          <input type="text" readonly disabled class="form-control-plaintext" id="accessType" :value="sharedEntity.access_type">
        </div>
      </div>
      <!-- Verified Source Code -->
      <div class="row" v-if="sharedEntity.is_verified_source_code">
        <label for="isVerifiedSourceCode" class="col-sm-4 col-form-label">Verified Source Code</label>
        <div class="col-sm-8">
          <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" readonly disabled id="isVerifiedSourceCode" :checked="sharedEntity.is_verified_source_code">
          </div>
        </div>
      </div>
      <!-- Remove Copyright -->
      <div class="row" v-if="sharedEntity.is_copyright_off">
        <label for="isCopyrightOff" class="col-sm-4 col-form-label">Remove Copyright</label>
        <div class="col-sm-8">
          <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" readonly disabled id="isCopyrightOff" :checked="sharedEntity.is_copyright_off">
          </div>
        </div>
      </div>
      <!-- Burnable -->
      <div class="row" v-if="sharedEntity.is_token_burnable">
        <label for="isTokenBurnable" class="col-sm-4 col-form-label">Burnable</label>
        <div class="col-sm-8">
          <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" readonly disabled id="isTokenBurnable" :checked="sharedEntity.is_token_burnable">
          </div>
        </div>
      </div>
      <!-- Mintabble -->
      <div class="row" v-if="sharedEntity.is_token_mintable">
        <label for="isTokenMintable" class="col-sm-4 col-form-label">Mintable</label>
        <div class="col-sm-8">
          <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" readonly disabled id="isTokenMintable" :checked="sharedEntity.is_token_mintable">
          </div>
        </div>
      </div>
      <!-- Operable -->
      <div class="row" v-if="sharedEntity.is_operable">
        <label for="isOperable" class="col-sm-4 col-form-label">Operable</label>
        <div class="col-sm-8">
          <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" readonly disabled id="isOperable" :checked="sharedEntity.is_operable">
          </div>
        </div>
      </div>
      <!-- Recover -->
      <div class="row" v-if="sharedEntity.is_token_recoverable">
        <label for="isTokenRecoverable" class="col-sm-4 col-form-label">Token Recover</label>
        <div class="col-sm-8">
          <div class="form-check form-switch">
            <input type="checkbox" class="form-check-input" readonly disabled id="isTokenRecoverable" :checked="sharedEntity.is_token_recoverable">
          </div>
        </div>
      </div>
      <!-- Network -->
      <div class="row">
        <label for="network" class="col-sm-4 col-form-label">Network</label>
        <div class="col-sm-8">
          <input type="text" readonly disabled class="form-control-plaintext" id="network" :value="sharedEntity.token_network">
        </div>
      </div>
      <hr/>
      <!-- Contract Address -->
      <div class="row">
        <label for="contractAddress" class="col-sm-4 col-form-label">Contract Address</label>
        <div class="col-sm-8">
          <span class="form-control-plaintext d-inline-flex" id="contractAddress">
            <a target="_blank" rel="noopener noreferrer" class="ellipsis" style="max-width: 470px" :href="'https://blueprints.juno.giansalex.dev/#/contracts/'+contract.address">{{contract.address}}</a>
          </span>
        </div>
      </div>
      <!-- Transaction Hash -->
      <div class="row">
        <label for="transactionHash" class="col-sm-4 col-form-label">Transaction Hash</label>
        <div class="col-sm-8">
          <span class="form-control-plaintext d-inline-flex" id="transactionHash">
            <a target="_blank" rel="noopener noreferrer" class="ellipsis" style="max-width: 470px;" :href="'https://blueprints.juno.giansalex.dev/#/transactions/'+contract.transaction_hash">{{contract.transaction_hash}}</a>
          </span>
        </div>
      </div>
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
      setSharedEntity(event) {
        this.sharedEntity = JSON.parse(JSON.stringify(event));
      },
      setContract(event) {
        this.contract = JSON.parse(JSON.stringify(event));
      },
      showModal() {
        this.is_modal_enabled = true;
      },
      hideModal() {
        this.is_modal_enabled = false;
      }
    },
    watch: {
      sharedEntity(value) {
        console.log('sharedEntity', value);
      },
      address(value) {
        console.log('address', value);
      },
      contract(value) {
        console.log('contract', value);
      }
    }
  }
</script>
