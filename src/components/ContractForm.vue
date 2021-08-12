<template>
  <div class="row mx-0">
    <div class="mb-3 p-0 col-lg-12 col-xl-10 offset-xl-1">
      <div class="card bg-transparent border-0">
        <div class="card-body">
          <div role="alert" aria-live="polite" aria-atomic="true" class="alert alert-danger">
            <h4 class="alert-heading">Alert</h4>
            <p>
              Work in progress.<br/>
              To use this app please install <a href="https://keplr.app/" rel="noopener" target="_blank" class="">Keplr</a>.
              Use any other wallet at your own risk.
            </p>
          </div>

          <form id="contract_form" @submit="submitForm" class="mb-5">
            <fieldset>
              <div class="row">
                <div class="col-lg-4 col-md-6">
                  <div class="card mt-3">
                    <div class="card-header bg-dark text-white">
                      Token Details
                    </div>
                    <div class="card-body">
                      <div role="group" class="form-group">
                        <label class="d-block">Token Name</label>
                        <div>
                          <input v-model="entity.token_name" class="form-control form-control-lg" min="1" maxlength="30" required placeholder="EZ Coin"/>
                          <small tabindex="-1" class="text-muted">Choose a name for your token.</small>
                          <small class="text-danger" v-if="hasError('token_name')">
                            {{this.errors.token_name.join('<br/>')}}
                          </small>
                        </div>
                      </div>

                      <div role="group" class="form-group">
                        <label class="d-block">Token Symbol</label>
                        <div>
                          <input v-model="entity.token_symbol" class="form-control form-control-lg" min="2" maxlength="10" required placeholder="XEZ"/>
                          <small tabindex="-1" class="text-muted">Choose a symbol for your token (usually 3-5 chars).</small>
                          <small class="text-danger" v-if="hasError('token_symbol')">
                            {{this.errors.token_symbol.join('<br/>')}}
                          </small>
                        </div>
                      </div>

                      <div role="group" class="form-group">
                        <label class="d-block">Token decimals</label>
                        <div>
                          <input v-model="entity.token_decimals" class="form-control form-control-lg" type="number" min="0" step="1" required/>
                          <small tabindex="-1" class="text-muted">Insert the decimal precision of your token. If you don't know what to insert, use 18.</small>
                          <small class="text-danger" v-if="hasError('token_decimals')">
                            {{this.errors.token_decimals.join('<br/>')}}
                          </small>
                        </div>
                      </div>

                      <div role="group" class="form-group">
                        <label class="d-block">Initial Supply</label>
                        <div>
                          <input v-model="entity.initial_supply" class="form-control form-control-lg" type="number" min="0" step="1" required placeholder="Your token initial supply"/>
                          <small tabindex="-1" class="text-muted">Insert the initial number of tokens available. Will be put in your account.</small>
                          <small class="text-danger" v-if="hasError('initial_supply')">
                            {{this.errors.initial_supply.join('<br/>')}}
                          </small>
                        </div>
                      </div>

                      <div role="group" class="form-group">
                        <label class="d-block">Total Supply</label>
                        <div>
                          <input v-model="entity.total_supply" class="form-control form-control-lg" type="number" min="0" step="1" required placeholder="Your token max supply" v-bind:disabled="is_total_supply_disabled_attr"/>
                          <small tabindex="-1" class="text-muted">Insert the maximum number of tokens available.</small>
                          <small class="text-danger" v-if="hasError('total_supply')">
                            {{this.errors.total_supply.join('<br/>')}}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-6">
                  <div class="card mt-3">
                    <div class="card-header bg-dark text-white">
                      Token Features
                    </div>
                    <div class="card-body">
                      <div role="group" class="form-group">
                        <label class="d-block">Supply Type</label>
                        <div>
                          <select v-model="entity.supply_type" class="form-select" v-bind:disabled="is_supply_type_disabled_attr">
                            <option v-for="option in supply_type_options" :value="option.value" v-bind:key="option.value">
                              {{ option.text }}
                            </option>
                          </select>
                          <small tabindex="-1" class="text-muted">100k, Fixed, Unlimited, Capped.</small>
                          <small class="text-danger" v-if="hasError('supply_type')">
                            {{this.errors.supply_type.join('<br/>')}}
                          </small>
                        </div>
                      </div>

                      <div role="group" class="form-group">
                        <label class="d-block">Access Type</label>
                        <div>
                          <select v-model="entity.access_type" class="form-select" v-bind:disabled="is_access_type_disabled_attr">
                            <option v-for="option in access_type_options" :value="option.value" v-bind:key="option.value">
                              {{ option.text }}
                            </option>
                          </select>
                          <small tabindex="-1" class="text-muted">None, Ownable, Role Based.</small>
                          <small class="text-danger" v-if="hasError('access_type')">
                            {{this.errors.access_type.join('<br/>')}}
                          </small>
                        </div>
                      </div>

                      <div role="group" class="form-group">
                        <div class="form-check form-switch">
                          <input type="checkbox" class="form-check-input" v-model="entity.is_verified_source_code" v-bind:disabled="is_verified_source_code_disabled_attr">
                          <label class="form-check-label">Verified Source Code</label>
                        </div>
                        <small tabindex="-1" class="text-muted">
                          Your Token Source Code will be automatically verified on JunoScan.
                        </small>
                        <small class="text-danger" v-if="hasError('is_verified_source_code')">
                          {{this.errors.is_verified_source_code.join('<br/>')}}
                        </small>
                      </div>

                      <div role="group" class="form-group">
                        <div class="form-check form-switch">
                          <input type="checkbox" class="form-check-input" v-model="entity.is_copyright_off" v-bind:disabled="is_copyright_off_disabled_attr">
                          <label class="form-check-label">Remove Copyright</label>
                        </div>
                        <small tabindex="-1" class="text-muted">
                          Remove the link pointing to this page from your contract.
                        </small>
                        <small class="text-danger" v-if="hasError('is_copyright_off')">
                          {{this.errors.is_copyright_off.join('<br/>')}}
                        </small>
                      </div>

                      <div role="group" class="form-group">
                        <div class="form-check form-switch">
                          <input type="checkbox" class="form-check-input" v-model="entity.is_token_burnable" v-bind:disabled="is_token_burnable_disabled_attr">
                          <label class="form-check-label">Burnable</label>
                        </div>
                        <small tabindex="-1" class="text-muted">
                          Your Token can be burnt.
                        </small>
                        <small class="text-danger" v-if="hasError('is_token_burnable')">
                          {{this.errors.is_token_burnable.join('<br/>')}}
                        </small>
                      </div>

                      <div role="group" class="form-group">
                        <div class="form-check form-switch">
                          <input type="checkbox" class="form-check-input" v-model="entity.is_token_mintable" v-bind:disabled="is_token_mintable_disabled_attr">
                          <label class="form-check-label">Mintable</label>
                        </div>
                        <small tabindex="-1" class="text-muted">You will be able
                          to generate tokens by minting them.
                        </small>
                        <small class="text-danger" v-if="hasError('is_token_mintable')">
                          {{this.errors.is_token_mintable.join('<br/>')}}
                        </small>
                      </div>

                      <div role="group" class="form-group">
                        <div class="form-check form-switch">
                          <input type="checkbox" class="form-check-input" v-model="entity.is_operable" v-bind:disabled="is_operable_disabled_attr">
                          <label class="form-check-label">Operable</label>
                        </div>
                        <small tabindex="-1" class="text-muted">
                          Make a callback on the receiver contract.
                        </small>
                        <small class="text-danger" v-if="hasError('is_operable')">
                          {{this.errors.is_operable.join('<br/>')}}
                        </small>
                      </div>

                      <div role="group" class="form-group">
                        <div class="form-check form-switch">
                          <input type="checkbox" class="form-check-input" v-model="entity.is_token_recoverable" v-bind:disabled="is_token_recoverable_disabled_attr">
                          <label class="form-check-label">Token Recover</label>
                        </div>
                        <small tabindex="-1" class="text-muted">Recover any CW20
                          token sent into the contract for error.
                        </small>
                        <small class="text-danger" v-if="hasError('is_token_recoverable')">
                          {{this.errors.is_token_recoverable.join('<br/>')}}
                        </small>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-lg-4 col-md-6">
                  <div class="card mt-3">
                    <div class="card-header bg-dark text-white">
                      Token Type and Network
                    </div>
                    <div class="card-body">
                      <div role="group" class="form-group">
                        <label class="d-block">Token Type *</label>
                        <div>
                          <select v-model="entity.token_type" class="form-select" v-bind:disabled="is_token_type_disabled_attr">
                            <option v-for="option in token_type_options" :value="option.value" v-bind:key="option.value" :disabled="option.disabled">
                              {{ option.text }}
                            </option>
                          </select>
                          <small tabindex="-1" class="text-muted">Choose your
                            Token Type.
                          </small>
                          <small class="text-danger" v-if="hasError('token_type')">
                            {{this.errors.token_type.join('<br/>')}}
                          </small>
                        </div>
                      </div>
                      <div role="group" class="form-group">
                        <label class="d-block">Network *</label>
                        <div>
                          <select v-model="entity.token_network" class="form-select" v-bind:disabled="is_token_network_disabled_attr">
                            <option v-for="option in token_network_options" :value="option.value" v-bind:key="option.value">
                              {{ option.text }}
                            </option>
                          </select>
                          <small tabindex="-1" class="text-muted">Choose your
                            Network.
                          </small>
                          <small class="text-danger" v-if="hasError('token_network')">
                            {{this.errors.token_network.join('<br/>')}}
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="card mt-3">
                    <div class="card-header bg-dark text-white">
                      Agreement
                    </div>
                    <div class="card-body">
                      <div role="group" class="form-group">
                        <div class="form-check">
                          <input type="checkbox" class="form-check-input" v-model="entity.is_agreement_checked" required>
                          <small tabindex="-1">
                            I have read, understood and agreed to CW20 Token Generator's <a href="#">Terms of Use</a>.
                          </small>
                        </div>
                        <p class="text-danger" v-if="hasError('is_agreement_checked')">
                          {{this.errors.is_agreement_checked.join('<br/>')}}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div class="card mt-3">
                    <div class="card-header bg-info text-white">
                      Transaction
                    </div>
                    <div class="list-group payment-box list-group-flush">
                      <div class="list-group-item d-flex justify-content-between">
                        <span>Commission Fee:
                          <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="info circle" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-info-circle b-icon bi">
                            <g>
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                              <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                            </g>
                          </svg>
                        </span>
                        <span class="badge bg-success">FREE</span>
                      </div>
                      <div class="list-group-item d-flex justify-content-between">
                        <span>Gas Fee:
                          <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img" aria-label="info circle" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi-info-circle b-icon bi">
                            <g>
                              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                              <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                            </g>
                          </svg>
                        </span>
                        <span class="badge bg-info">Variable</span>
                      </div>
                      <div class="list-group-item">
                        <div class="d-flex justify-content-between">
                          <span>Wallet Status:</span>

                          <span class="badge bg-success d-grid" v-if="address">Connected with <span class="ellipsis">{{address}}</span></span>
                          <span class="badge bg-warning d-flex" v-else v-bind:onclick="retryKeplrConnection">Not connected</span>
                        </div>
                        <small class="text-danger" v-if="hasError('account')">
                          {{this.errors.account.join('<br/>')}}
                        </small>
                      </div>
                    </div>
                  </div>

                  <button type="submit" v-bind:disabled="is_submitting" class="btn mt-3 py-3 px-5 text-uppercase btn-success btn-lg w-100">
                    <span v-if="is_submitting" class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </span>
                    <span v-else>Confirm</span>
                  </button>

                  <div class="row mt-3" v-if="transaction_hash.length > 0 && !is_submitting">
                    <p class="d-inline-flex">Transaction details <span class="btn-link ellipsis" @click="$emit('open')" style="max-width: 200px;margin-left:5px;cursor:pointer;">{{transaction_hash}}</span></p>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import KeplrContract from "../services/KeplrContract"
  import ContractFormEntity from "../entities/ContractFormEntity"
  import ContractFormEntityTypes from "../entities/ContractFormEntityTypes"
  import ContractFormModel from "../models/ContractFormModel"
  import ContractFormOptions from "../form/ContractFormOptions"

  export default {
    name: 'ContractForm',
    emits: ['open', 'update:address', 'update:sharedEntity', 'update:contract'],
    inject: ['keplr'],
    props: {
      address: String,
      sharedEntity: {
        ...ContractFormEntityTypes
      },
      contract: Object,
    },
    data() {
      return {
        entity: { ...ContractFormEntity },
        ...ContractFormModel,
        ...ContractFormOptions,
      }
    },
    mounted() {
      window.addEventListener("keplr_keystorechange", async () => {
        this.errors.account = []
      });
    },
    methods: {
      hasError(key) {
        return this.errors[key].length > 0;
      },
      resetErrors() {
        this.errors.account = [];
        this.errors.token_name = [];
        this.errors.token_symbol = [];
        this.errors.token_decimals = [];
        this.errors.initial_supply = [];
        this.errors.access_type = [];
        this.errors.supply_type = [];
      },
      checkForm() {
        let errorLength = 0;
        this.resetErrors();

        if (!(this.entity.token_name.length >= 3 && this.entity.token_name.length <= 50)) {
          errorLength++;
          this.errors.token_name.push("Token Name length must be between 3 and 50 characters (UTF-8).")
        }

        const regex = /[a-zA-Z-]{3,12}/;
        if (!(this.entity.token_symbol.match(regex))) {
          errorLength++;
          this.errors.token_symbol.push("Token Symbol length must be between 3 and 10 characters.")
        }

        // decimals:
        // reserve_decimals: can be 0
        // if (!(this.entity.token_decimals >= 2 && this.entity.token_decimals <= 10)) {
        //   errorLength++;
        //   this.errors.token_decimals.push("Token decimals must be between 2 and 10.")
        // }
        //
        // if (!(this.entity.initial_supply >= 1 && this.entity.token_decimals <= 100000000000000)) {
        //   errorLength++;
        //   this.errors.token_decimals.push("Initial Supply must be between 0 and 100000000000000")
        // }

        return errorLength < 1;
      },
      getContractType() {
        switch (this.entity.token_type) {
          default:
          case "cw20-base":
            return "instantiateCW20BaseContract";
          case "cw20-staking":
            return "instantiateCW20StakingContract";
          case "cw20-atomic_swap":
            return "instantiateCW20AtomicSwapContract";
          case "cw20-bonding":
            return "instantiateCW20BondingContract";
          case "cw20-escrow":
            return "instantiateCW20EscrowContract";
        }
      },
      async retryKeplrConnection() {
        console.debug('ContractForm::retryKeplrConnection');
        let isSuccess = false;

        try {
          isSuccess = await this.keplr.retryKeplrConnection();
        } catch (e) {
          isSuccess = false;
          this.errors = {...this.errors, ...await KeplrContract.getTransactionErrors(this.keplr, e)};
        }

        if (isSuccess) {
          this.$emit("update:address", this.keplr.address);
        }

        return isSuccess;
      },
      async submitForm(e) {
        e.preventDefault();

        this.is_submitting = true;

        try {
          if (!this.checkForm() || !await this.keplr.retryKeplrConnection()) {
            this.is_submitting = false;
            return false;
          }

          this.$emit('update:address', this.keplr.address);

          const contract = await KeplrContract[this.getContractType()](this.keplr, {
            token_name: this.entity.token_name,
            token_symbol: this.entity.token_symbol,
            token_decimals: this.entity.token_decimals,
            initial_supply: this.entity.initial_supply,
          });

          if (typeof contract.contractAddress !== "undefined") {
            this.contract_address = contract.contractAddress;
            this.transaction_hash = contract.transactionHash;

            this.$emit('update:sharedEntity', this.entity);
            this.$emit('update:contract', {address: this.contract_address, transaction_hash: this.transaction_hash});
            this.$emit('open');
          }
        } catch (e) {
          this.errors = {...this.errors, ...await KeplrContract.getTransactionErrors(this.keplr, e)};
        }

        this.is_submitting = false;
      },
    },
  }
</script>
