<template>
    <h1>cw-generator</h1>
    <h2>Create your Juno Token</h2>

    <div role="alert" aria-live="polite" aria-atomic="true" class="alert alert-danger">
        <h4 class="alert-heading">Alert</h4>
        <p>
            Brave is not supported, use Chrome instead.<br/>
            To use this app please install <a href="https://keplr.app/" rel="noopener" target="_blank" class="">Keplr</a>.
            Use any other wallet at your own risk.
        </p>
    </div>

    <form id="contract_form" @submit="checkForm">
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
                                    <input v-model="token_name" class="form-control form-control-lg" maxlength="30"/>
                                    <small class="text-danger" style="display: none;"></small>
                                </div>
                            </div>

                            <div role="group" class="form-group">
                                <label class="d-block">Token Symbol</label>
                                <div>
                                    <input v-model="token_symbol" class="form-control form-control-lg" maxlength="10"/>
                                    <small class="text-danger" style="display: none;"></small>
                                </div>
                            </div>

                            <div role="group" class="form-group">
                                <label class="d-block">Token decimals</label>
                                <div>
                                    <input v-model="token_decimals" class="form-control form-control-lg" type="number" min="0" step="1"/>
                                    <small class="text-danger" style="display: none;"></small>
                                </div>
                            </div>

                            <div role="group" class="form-group">
                                <label class="d-block">Initial Supply</label>
                                <div>
                                    <input v-model="initial_supply" class="form-control form-control-lg" type="number" min="0" step="1"/>
                                    <small class="text-danger" style="display: none;"></small>
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

                    <button type="submit" class="btn mt-3 py-3 px-5 text-uppercase btn-success btn-lg w-100">
                        Confirm
                    </button>
                </div>
            </div>
        </fieldset>
    </form>

    <div class="row mt-3">
        <h3>Recap</h3>
        <div>
            <div v-bind:style="[(transaction_hash.length > 0) ? 'block' : 'none']">
                Check your transaction {{ transaction_hash }} on
                <a v-bind:href="'https://blueprints.juno.giansalex.dev/#/contracts/'+transaction_hash">Juno Explorer</a>
            </div><br/>
            Token Name: {{ token_name }}<br/>
            Token Symbol: {{ token_symbol }}<br/>
            Token decimals: {{ token_decimals }}<br/>
            Initial Supply: {{ initial_supply }}
        </div>
    </div>
</template>

<script>
    import { SigningCosmWasmClient } from "@cosmjs/cosmwasm-stargate"

    export default {
        name: 'ContractForm',
        data() {
            return {
                transaction_hash: "",
                token_name: "",
                token_symbol: "",
                token_decimals: 18,
                initial_supply: 21000000,
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
            async sendTransaction(contract, executeMsg) {
                return await this.keplr_client.execute(this.keplr_address, contract, executeMsg)
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
                const label = "wc-generator";

                return await this.keplr_client.instantiate(this.keplr_address, codeId, executeMsg, label);
            },
            async checkForm(e) {
                e.preventDefault();

                if (!await this.isKeplrConnected()) {
                    return false;
                }

                const contract = await this.instantiateContract();

                console.log('response:', contract);

                if (contract.contractAddress !== "undefined") {
                    this.transaction_hash = contract.transactionHash;
                }
            }
        }
    }
</script>

<style>
    .form-group {
        margin-bottom: 1em;
    }
</style>