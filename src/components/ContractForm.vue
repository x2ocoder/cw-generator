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
        <p>
            Token Name: {{ token_name }}<br/>
            Token Symbol: {{ token_symbol }}<br/>
            Token decimals: {{ token_decimals }}<br/>
            Initial Supply: {{ initial_supply }}
        </p>
    </div>
</template>

<script>
    import { SigningCosmosClient } from '@cosmjs/launchpad'

    export default {
        name: 'ContractForm',
        data() {
            return {
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
            async connectKeplr() {
                if (!window.getOfflineSigner || !window.keplr) {
                    console.log('not detected', window.getOfflineSigner, window.keplr)
                } else {
                    const chainId = "cosmoshub-4";

                    // Enabling before using the Keplr is recommended.
                    // This method will ask the user whether or not to allow access if they haven't visited this website.
                    // Also, it will request user to unlock the wallet if the wallet is locked.
                    await window.keplr.enable(chainId);

                    const offlineSigner = window.getOfflineSigner(chainId);

                    // You can get the address/public keys by `getAccounts` method.
                    // It can return the array of address/public key.
                    // But, currently, Keplr extension manages only one address/public key pair.
                    // XXX: This line is needed to set the sender address for SigningCosmosClient.
                    const accounts = await offlineSigner.getAccounts();

                    // Initialize the gaia api with the offline signer that is injected by Keplr extension.
                    new SigningCosmosClient(
                        "https://lcd-cosmoshub.keplr.app",
                        accounts[0].address,
                        offlineSigner,
                    );

                    console.log("Address", accounts[0].address)
                }
            },
            checkForm(e) {
                this.connectKeplr();
                e.preventDefault();
            }
        }
    }
</script>

<style>
    .form-group {
        margin-bottom: 1em;
    }
</style>