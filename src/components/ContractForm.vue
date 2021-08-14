<template lang="pug">
include ../pug-mixins/formGroup
.row.mx-0
  .mb-3.p-0.col-lg-12.col-xl-10.offset-xl-1
    .card.bg-transparent.border-0
      .card-body
        div(role="alert" aria-live="polite" aria-atomic="true").alert.alert-danger
          h4.alert-header Alert
          p Work in progress #[br]
            | To use this app please install #[a(href="https://keplr.app/", rel="noopener", target="_blank") Keplr].
            | Use any other wallet at your own risk.
        form(@submit="submitForm")#contract_form.mb-5
          fieldset
            .row
              .col-lg-4.col-md-6
                .card.mt-3
                  .card-header.bg-dark.text-white Token Details
                  .card-body
                    +formGroupInput('Token Name', {"type":"text", "min":"1", "maxlength":"30", "placeholder":"EZ Coin", "required":"true"}, "token_name", "Choose a name for your token.")
                    +formGroupInput('Token Symbol', {"type":"text", "min":"2", "maxlength":"10", "placeholder":"XEZ", "required":"true"}, "token_symbol", "Choose a symbol for your token (usually 3-5 chars).")
                    +formGroupInput('Token decimals', {"type":"number", "min":"0", "step":"1", "required":"true"}, "token_decimals", "Insert the decimal precision of your token. If you don't know what to insert, use 18.")
                    +formGroupInput('Initial Supply', {"type":"number", "min":"0", "step":"1", "placeholder": "Your token initial supply", "required":"true"}, "initial_supply", "Your token initial supply")
                    +formGroupInput('Total Supply', {"type":"number", "min":"0", "step":"1", "placeholder":"Your token max supply", "required":"true", "v-bind:disabled":"is_total_supply_disabled_attr"}, "total_supply", "Insert the maximum number of tokens available.")
              .col-lg-4.col-md-6
                .card.mt-3
                  .card-header.bg-dark.text-white Token Features
                  .card-body
                    +formGroupSelect('Supply Type', {}, 'supply_type', '100k, Fixed, Unlimited, Capped.')
                    +formGroupSelect('Access Type', {}, 'access_type', 'None, Ownable, Role Based.')
                    +formGroupToggle('Verified Source Code', {}, "is_verified_source_code", "Your Token Source Code will be automatically verified on JunoScan.")
                    +formGroupToggle('Remove Copyright', {}, "is_copyright_off", "Remove the link pointing to this page from your contract.")
                    +formGroupToggle('Burnable', {}, "is_token_burnable", "Your Token can be burnt.")
                    +formGroupToggle('Mintable', {}, "is_token_mintable", "You will be able to generate tokens by minting them.")
                    +formGroupToggle('Operable', {}, "is_operable", "Make a callback on the receiver contract.")
                    +formGroupToggle('Token Recover', {}, "is_token_recoverable", "Recover any CW20 token sent into the contract for error.")
              .col-lg-4.col-md-6
                .card.mt-3
                  .card-header.bg-dark.text-white Token Type and Network
                  .card-body
                    +formGroupSelect('Token Type *', {}, 'token_type', 'Choose your Token Type.')
                    +formGroupSelect('Network *', {}, 'token_network', 'Choose your Network.')
                .card.mt-3
                  .card-header.bg-dark.text-white Agreement
                  .card-body
                    .form-group(role="group")
                      .form-check
                        input(type="checkbox" v-model="entity.is_agreement_checked").form-check-input
                        small(tabindex="-1").text-muted I have read, understood and agreed to CW20 Token Generator's
                         |  #[a(@click='$emit("openModal", "is_terms_of_use_modal_enabled")').btn-link Terms of Use].
                      p(v-if="hasError('is_agreement_checked')").text-danger {{this.errors.is_agreement_checked.join('<br>')}}
                .card.mt-3
                  .card-header.bg-dark.text-white Transaction
                  .list-group.payment-box.list-group-flush
                    .list-group-item.d-flex.justify-content-between
                      span Commission Fee:&nbsp;
                        svg(data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Commission will be transferred directly to us through the Juno network as part of your payment. Commission will support JunoMint to keep it safe, running and constantly updated." width="1em" height="1em" focusable="false" role="img" aria-label="info circle").bi-info-circle.b-icon.bi
                          use(xlink:href="../assets/svg/tip.svg#tip")
                      span.badge.bg-success FREE
                    .list-group-item.d-flex.justify-content-between
                      span Gas Fee:&nbsp;
                        svg(data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="It depends on Gas Limit and on current Gas price average. Keplr will suggest both. Do not decrease Gas Limit to avoid transaction to fail. If you want, you can decrease Gas Price but your transaction could remain pending for minutes/hours. Read how to calculate right value in our FAQ. Failed transaction can't be refunded." width="1em" height="1em" focusable="false" role="img" aria-label="info circle").bi-info-circle.b-icon.bi
                          use(xlink:href="../assets/svg/tip2.svg#tip2")
                      span.badge.bg-info Variable
                    .list-group-item
                      .d-flex.justify-content-between
                        span Wallet Status:
                        span(v-if="address").badge.bg-success.d-grid Connected with #[span.ellipsis {{address}}]
                        span(v-else v-bind:onclick="retryKeplrConnection").badge.bg-warning.d-flex Not connected
                      p(v-if="hasError('is_agreement_checked')").text-danger {{this.errors.is_agreement_checked.join('<br>')}}
                button(type="submit" v-bind:disabled="is_submitting").btn.mt-3.py-3.px-5.text-uppercase.btn-success.btn-lg.w-100
                  span(v-if="is_submitting" role="status").spinner-border.text-primary #[span.visually-hidden Loading...]
                  span(v-else) Confirm
                .row.mt-3(v-if="transaction_hash.length > 0 && !is_submitting")
                  p.d-inline-flex Transaction details
                    span(@click='$emit("openModal", "is_transaction_details_modal_enabled")' style="max-width: 200px;margin-left:5px;cursor:pointer;").btn-link.ellipsis {{transaction_hash}}
</template>

<script>
  import KeplrContract from "../services/Keplr/KeplrContract"
  import ContractEntity from "../entities/ContractEntity"
  import ContractEntityTypes from "../entities/types/ContractEntityTypes"
  import ContractModel from "../models/ContractModel"
  import ContractFormOptions from "../form/options/ContractFormOptions"

  export default {
    name: 'ContractForm',
    emits: [
      'update:address',
      'update:sharedEntity',
      'update:contract'
    ],
    inject: ['keplr'],
    props: {
      address: String,
      sharedEntity: {...ContractEntityTypes},
      contract: Object,
    },
    data() {
      return {
        entity: { ...ContractEntity },
        ...ContractModel,
        ...ContractFormOptions,
      }
    },
    mounted() {
      [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]')).map(function (popoverTriggerEl) {
        new window.bootstrap.Popover(popoverTriggerEl)
      })

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
            this.$emit('openModal', 'is_transaction_details_modal_enabled');
          }
        } catch (e) {
          this.errors = {...this.errors, ...await KeplrContract.getTransactionErrors(this.keplr, e)};
        }

        this.is_submitting = false;
      },
    },
  }
</script>
