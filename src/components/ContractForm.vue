<template>
    <h1 class="mb-4 d-block">Junø Token Generator</h1>

    <div role="alert" aria-live="polite" aria-atomic="true" class="alert alert-danger">
        <h4 class="alert-heading">Alert</h4>
        <p>
            Work in progress.<br/>
            To use this app please install <a href="https://keplr.app/" rel="noopener" target="_blank" class="">Keplr</a>.
            Use any other wallet at your own risk.
        </p>
    </div>

    <form id="contract_form" @submit="submitForm">
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
                                    <input v-model="token_name" class="form-control form-control-lg" min="1" maxlength="30" required placeholder="EZ Coin"/>
                                    <small class="text-danger" v-if="hasError('token_name')">
                                        {{this.errors.token_name.join('<br/>')}}
                                    </small>
                                </div>
                            </div>

                            <div role="group" class="form-group">
                                <label class="d-block">Token Symbol</label>
                                <div>
                                    <input v-model="token_symbol" class="form-control form-control-lg" min="2" maxlength="10" required placeholder="XEZ"/>
                                    <small class="text-danger" v-if="hasError('token_symbol')">
                                        {{this.errors.token_symbol.join('<br/>')}}
                                    </small>
                                </div>
                            </div>

                            <div role="group" class="form-group">
                                <label class="d-block">Token decimals</label>
                                <div>
                                    <input v-model="token_decimals" class="form-control form-control-lg" type="number" min="0" step="1" required/>
                                    <small class="text-danger" v-if="hasError('token_decimals')">
                                        {{this.errors.token_decimals.join('<br/>')}}
                                    </small>
                                </div>
                            </div>

                            <div role="group" class="form-group">
                                <label class="d-block">Initial Supply</label>
                                <div>
                                    <input v-model="initial_supply" class="form-control form-control-lg" type="number" min="0" step="1" required/>
                                    <small class="text-danger" v-if="hasError('initial_supply')">
                                        {{this.errors.initial_supply.join('<br/>')}}
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
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 col-md-6">
                    <div class="card mt-3">
                        <div class="card-header bg-dark text-white">
                            Token Type and Network
                        </div>
                        <div class="card-body">
                        </div>
                    </div>

                    <div class="card mt-3">
                        <div class="card-header bg-dark text-white">
                            Agreement
                        </div>
                        <div class="card-body">
                        </div>
                    </div>

                    <div class="card mt-3">
                        <div class="card-header bg-dark text-white">
                            Transaction
                        </div>
                        <div class="card-body">
                        </div>
                    </div>

                    <button type="submit" v-bind:disabled="isSubmitting" class="btn mt-3 py-3 px-5 text-uppercase btn-success btn-lg w-100">
                        <span v-if="isSubmitting" class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </span>
                        <span v-else>Confirm</span>
                    </button>

                    <div class="row mt-3" v-if="transaction_hash.length > 0 && !isSubmitting">
                        <div>
                            Check your transaction on <a v-bind:href="'https://blueprints.juno.giansalex.dev/#/contracts/'+contract_address">Juno Blueprints</a><br/>
                        </div>
                    </div>
                </div>
            </div>
        </fieldset>
    </form>
</template>

<script>
    import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"

    export default {
        name: 'ContractForm',
        data() {
            return {
                errors: {
                    token_name: [],
                    token_symbol: [],
                    token_decimals: [],
                    initial_supply: [],
                },
                contract_address: "",
                transaction_hash: "",
                token_name: "",
                token_symbol: "",
                token_decimals: 18,
                initial_supply: 21000000,
                isSubmitting: false,
            }
        },
        mounted() {
            this.$nextTick(function () {
                this.connectKeplr()
            })
        },
        methods: {
            hasKeplr() {
                return window.getOfflineSigner && window.keplr
            },
            async isKeplrConnected() {
                if (this.keplr_client) {
                    return true;
                }

                await this.connectKeplr();

                if (this.keplr_client) {
                    return true;
                }

                console.log('Impossible de se connecter à Keplr');

                return false;
            },
            async connectKeplr() {
                if (!this.hasKeplr()) {
                    return;
                }

                const chainId = "lucina";
                await window.keplr.enable(chainId);

                this.keplr_api_url = "https://rpc.juno.giansalex.dev";
                this.offlineSigner = window.getOfflineSigner(chainId);
                this.keplr_address = (await this.offlineSigner.getAccounts())[0].address;
                this.keplr_client = await SigningCosmWasmClient.connectWithSigner(
                    this.keplr_api_url,
                    this.offlineSigner
                );
            },
            async instantiateContract() {
                const codeId = 34;
                const executeMsg = {
                    name: this.token_name,
                    symbol: this.token_symbol,
                    decimals: 2,
                    reserve_denom: "u" + this.token_symbol,
                    reserve_decimals: (this.token_decimals - 2),
                    curve_type: {
                        linear: {
                            slope: "1",
                            scale: 1
                        }
                    },
                    initial_balances: [
                        {
                            address: this.keplr_address,
                            amount: this.initial_supply.toString()
                        }
                    ],
                    mint: {
                        minter: this.keplr_address,
                        cap: this.initial_supply.toString()
                    }
                };
                const label = "Juno Token Generator by @EZStaking";

                return await this.keplr_client.instantiate(this.keplr_address, codeId, executeMsg, label);
            },
            hasError(key) {
                return this.errors[key].length > 0;
            },
            checkForm() {
                let errorLength = 0;
                this.errors.token_name = [];
                this.errors.token_symbol = [];
                this.errors.token_decimals = [];
                this.errors.initial_supply = [];

                if (!(this.token_name.length >= 3 && this.token_name.length <= 50)) {
                    errorLength++;
                    this.errors.token_name.push("Token Name length must be between 3 and 50 characters (UTF-8).")
                }

                const regex = /[a-zA-Z-]{3,12}/;
                if (!(this.token_symbol.match(regex))) {
                    errorLength++;
                    this.errors.token_symbol.push("Token Symbol length must be between 3 and 10 characters.")
                }

                // decimals:
                // reserve_decimals: can be 0
                // if (!(this.token_decimals >= 2 && this.token_decimals <= 10)) {
                //     errorLength++;
                //     this.errors.token_decimals.push("Token decimals must be between 2 and 10.")
                // }
                //
                // if (!(this.initial_supply >= 1 && this.token_decimals <= 100000000000000)) {
                //     errorLength++;
                //     this.errors.token_decimals.push("Initial Supply must be between 0 and 100000000000000")
                // }

                return errorLength < 1;
            },
            async submitForm(e) {
                e.preventDefault();

                this.isSubmitting = true;

                if (!this.checkForm() || !await this.isKeplrConnected()) {
                    this.isSubmitting = false;
                    return false;
                }

                try {
                    const contract = await this.instantiateContract();

                    console.debug('response:', contract);

                    if (contract.contractAddress !== "undefined") {
                        this.contract_address = contract.contractAddress;
                        this.transaction_hash = contract.transactionHash;
                    }
                } catch (e) {
                    console.error(e);
                }

                this.isSubmitting = false;
            }
        }
    }
</script>

<style>
    .form-group {
        margin-bottom: 1em;
    }
</style>