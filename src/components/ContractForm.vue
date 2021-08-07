<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="https://junochain.com/">
                    <img src="juno_favicon.svg" alt="" width="30" height="24" class="d-inline-block align-text-top">
                    Juno Smart Chain
                </a>

                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="d-flex">
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">Wallet</a>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Useful Links
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <li><a class="dropdown-item" href="#">EZStaking.io — Staking Provider</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>

        <!--<nav class="navbar navbar-expand-lg navbar-light bg-light">-->
            <!--<div class="container-fluid">-->

                <!--<a class="navbar-brand" href="https://junochain.com/">-->
                    <!--<img src="juno_favicon.svg" alt="" width="30" height="24" class="d-inline-block align-text-top">-->
                    <!--Juno Smart Chain-->
                <!--</a>-->

                <!--<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">-->
                    <!--<span class="navbar-toggler-icon"></span>-->
                <!--</button>-->

                <!--<div class="collapse navbar-collapse" id="navbarSupportedContent">-->
                    <!--<ul class="navbar-nav">-->
                        <!--<li class="nav-item">-->
                            <!--<a class="nav-link" aria-current="page" href="#">Wallet</a>-->
                            <!--<a class="nav-link" aria-current="page" href="#">EZ Staking Validator</a>-->
                        <!--</li>-->
                    <!--</ul>-->
                <!--</div>-->
            <!--</div>-->
        <!--</nav>-->

        <div class="mb-0 kingyna-gradient text-white">
            <div class="container p-5">
                <h1 class="display-5 fw-bold">Create your CW20 Token</h1>

                <p class="lead">
                    Easily deploy Smart Contract for a Standard, Capped, Mintable, Burnable CW20 Token.
                    <br>
                    CW20 Generator is the easiest and fastest way to create your own CW20 token on the Juno Smart Chain network. No coding skills are required.
                </p>
            </div>
        </div>

        <div class="row mx-0">
            <div class="mb-3 p-0 col-lg-12 col-xl-10 offset-xl-1">
                <div class="card bg-transparent border-0">
                    <div class="card-body">
                        <div role="alert" aria-live="polite" aria-atomic="true" class="alert alert-danger">
                            <h4 class="alert-heading">Alert</h4>
                            <p>
                                Work in progress.<br/>
                                To use this app please install <a href="https://keplr.app/" rel="noopener"
                                                                  target="_blank" class="">Keplr</a>.
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
                                                        <input v-model="token_name" class="form-control form-control-lg"
                                                               min="1" maxlength="30" required placeholder="EZ Coin"/>
                                                        <small tabindex="-1" class="text-muted">Choose a name
                                                            for your token.
                                                        </small>
                                                        <small class="text-danger" v-if="hasError('token_name')">
                                                            {{this.errors.token_name.join('<br/>')}}
                                                        </small>
                                                    </div>
                                                </div>

                                                <div role="group" class="form-group">
                                                    <label class="d-block">Token Symbol</label>
                                                    <div>
                                                        <input v-model="token_symbol"
                                                               class="form-control form-control-lg" min="2"
                                                               maxlength="10" required placeholder="XEZ"/>
                                                        <small tabindex="-1" class="text-muted">Choose a
                                                            symbol for your token (usually 3-5 chars).
                                                        </small>
                                                        <small class="text-danger" v-if="hasError('token_symbol')">
                                                            {{this.errors.token_symbol.join('<br/>')}}
                                                        </small>
                                                    </div>
                                                </div>

                                                <div role="group" class="form-group">
                                                    <label class="d-block">Token decimals</label>
                                                    <div>
                                                        <input v-model="token_decimals"
                                                               class="form-control form-control-lg" type="number"
                                                               min="0" step="1" required/>
                                                        <small tabindex="-1" class="text-muted">Insert the
                                                            decimal precision of your token. If you don't know what to
                                                            insert, use 18.
                                                        </small>
                                                        <small class="text-danger" v-if="hasError('token_decimals')">
                                                            {{this.errors.token_decimals.join('<br/>')}}
                                                        </small>
                                                    </div>
                                                </div>

                                                <div role="group" class="form-group">
                                                    <label class="d-block">Initial Supply</label>
                                                    <div>
                                                        <input v-model="initial_supply"
                                                               class="form-control form-control-lg" type="number"
                                                               min="0" step="1" required
                                                               placeholder="Your token initial supply"/>
                                                        <small tabindex="-1" class="text-muted">Insert the
                                                            initial number of tokens available. Will be put in your
                                                            account.
                                                        </small>
                                                        <small class="text-danger" v-if="hasError('initial_supply')">
                                                            {{this.errors.initial_supply.join('<br/>')}}
                                                        </small>
                                                    </div>
                                                </div>

                                                <div role="group" class="form-group">
                                                    <label class="d-block">Total Supply</label>
                                                    <div>
                                                        <input v-model="total_supply"
                                                               class="form-control form-control-lg" type="number"
                                                               min="0" step="1" required
                                                               placeholder="Your token max supply"
                                                               v-bind:disabled="is_total_supply_disabled_attr"/>
                                                        <small tabindex="-1" class="text-muted">Insert the
                                                            maximum number of tokens available.
                                                        </small>
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
                                                        <select v-model="supply_type" class="form-select" v-bind:disabled="is_supply_type_disabled_attr">
                                                            <option v-for="option in supply_type_options"
                                                                    :value="option.value" v-bind:key="option.value">
                                                                {{ option.text }}
                                                            </option>
                                                        </select>
                                                        <small tabindex="-1" class="text-muted">100k, Fixed,
                                                            Unlimited, Capped
                                                        </small>
                                                        <small class="text-danger" v-if="hasError('supply_type')">
                                                            {{this.errors.supply_type.join('<br/>')}}
                                                        </small>
                                                    </div>
                                                </div>

                                                <div role="group" class="form-group">
                                                    <label class="d-block">Access Type</label>
                                                    <div>
                                                        <select v-model="access_type" class="form-select" v-bind:disabled="is_access_type_disabled_attr">
                                                            <option v-for="option in access_type_options"
                                                                    :value="option.value" v-bind:key="option.value">
                                                                {{ option.text }}
                                                            </option>
                                                        </select>
                                                        <small tabindex="-1" class="text-muted">None, Ownable, Role Based</small>
                                                        <small class="text-danger" v-if="hasError('access_type')">
                                                            {{this.errors.access_type.join('<br/>')}}
                                                        </small>
                                                    </div>
                                                </div>

                                                <div role="group" class="form-group">
                                                    <div class="form-check form-switch">
                                                        <input type="checkbox" class="form-check-input" v-model="is_verified_source_code" v-bind:disabled="is_verified_source_code_disabled_attr">
                                                        <label class="form-check-label">Verified Source Code</label>
                                                    </div>
                                                    <small tabindex="-1" class="text-muted">Your Token Source
                                                        Code will be automatically verified on JunoScan.
                                                    </small>
                                                    <small class="text-danger"
                                                           v-if="hasError('is_verified_source_code')">
                                                        {{this.errors.is_verified_source_code.join('<br/>')}}
                                                    </small>
                                                </div>

                                                <div role="group" class="form-group">
                                                    <div class="form-check form-switch">
                                                        <input type="checkbox" class="form-check-input"
                                                               v-model="is_copyright_off"
                                                               v-bind:disabled="is_copyright_off_disabled_attr">
                                                        <label class="form-check-label">Remove Copyright</label>
                                                    </div>
                                                    <small tabindex="-1" class="text-muted">Remove the link
                                                        pointing to this page from your contract.
                                                    </small>
                                                    <small class="text-danger" v-if="hasError('is_copyright_off')">
                                                        {{this.errors.is_copyright_off.join('<br/>')}}
                                                    </small>
                                                </div>

                                                <div role="group" class="form-group">
                                                    <div class="form-check form-switch">
                                                        <input type="checkbox" class="form-check-input"
                                                               v-model="is_token_burnable"
                                                               v-bind:disabled="is_token_burnable_disabled_attr">
                                                        <label class="form-check-label">Burnable</label>
                                                    </div>
                                                    <small tabindex="-1" class="text-muted">Your Token can be
                                                        burnt.
                                                    </small>
                                                    <small class="text-danger" v-if="hasError('is_token_burnable')">
                                                        {{this.errors.is_token_burnable.join('<br/>')}}
                                                    </small>
                                                </div>

                                                <div role="group" class="form-group">
                                                    <div class="form-check form-switch">
                                                        <input type="checkbox" class="form-check-input"
                                                               v-model="is_token_mintable"
                                                               v-bind:disabled="is_token_mintable_disabled_attr">
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
                                                        <input type="checkbox" class="form-check-input"
                                                               v-model="is_operable"
                                                               v-bind:disabled="is_operable_disabled_attr">
                                                        <label class="form-check-label">Operable</label>
                                                    </div>
                                                    <small tabindex="-1" class="text-muted">Make a callback on
                                                        the receiver contract.
                                                    </small>
                                                    <small class="text-danger" v-if="hasError('is_operable')">
                                                        {{this.errors.is_operable.join('<br/>')}}
                                                    </small>
                                                </div>

                                                <div role="group" class="form-group">
                                                    <div class="form-check form-switch">
                                                        <input type="checkbox" class="form-check-input"
                                                               v-model="is_token_recoverable"
                                                               v-bind:disabled="is_token_recoverable_disabled_attr">
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
                                                        <select v-model="token_type" class="form-select" disabled>
                                                            <option v-for="option in token_type_options" :value="option.value" v-bind:key="option.value">
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
                                                        <select v-model="token_network" class="form-select" v-bind:disabled="is_token_network_disabled_attr">
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
                                                        <input type="checkbox" class="form-check-input"
                                                               v-model="is_agreement_checked">
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
                                                        <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img"
                                                             aria-label="info circle" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                             class="bi-info-circle b-icon bi">
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
                                                        <svg viewBox="0 0 16 16" width="1em" height="1em" focusable="false" role="img"
                                                             aria-label="info circle" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
                                                             class="bi-info-circle b-icon bi">
                                                            <g>
                                                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                                                                <path d="M8.93 6.588l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
                                                            </g>
                                                        </svg>
                                                    </span>
                                                    <span class="badge bg-info">Variable</span>
                                                </div>
                                                <div class="list-group-item d-flex justify-content-between">
                                                    <span>Wallet Status:</span>
                                                    <span class="badge bg-success" v-if="keplr_address && keplr_address.length">
                                                        Connected with <span class="ellipsis d-inline-flex">{{keplr_address}}</span>
                                                    </span>
                                                    <span class="badge bg-warning" v-else>Not connected</span>
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
                                            <div>
                                                Check your transaction on <a v-bind:href="'https://blueprints.juno.giansalex.dev/#/contracts/'+contract_address">Juno Blueprints</a><br/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
                    total_supply: [],
                    access_type: [],
                    supply_type: [],
                    is_verified_source_code: [],
                    is_copyright_off: [],
                    is_token_burnable: [],
                    is_token_mintable: [],
                    is_operable: [],
                    is_token_recoverable: [],
                    token_type: [],
                    token_network: [],
                    is_agreement_checked: [],
                },
                keplr_address: null,
                // model
                token_name: "",
                token_symbol: "",
                token_decimals: 18,
                initial_supply: null,
                total_supply: null,
                access_type: "Ownable",
                access_type_options: [
                    { text: "None", value: "None" },
                    { text: "Ownable", value: "Ownable" },
                    { text: "Role Based", value: "Based" },
                ],
                supply_type: "Fixed",
                supply_type_options: [
                    { text: "100k", value: "100k" },
                    { text: "Fixed", value: "Fixed" },
                    { text: "Unlimited", value: "Unlimited" },
                    { text: "Capped", value: "Capped" }
                ],
                is_verified_source_code: true,
                is_copyright_off: false,
                is_token_burnable: false,
                is_token_mintable: false,
                is_operable: false,
                is_token_recoverable: false,
                token_type: "cw20-base",
                token_type_options: [
                    { text: "SimpleCW20", value: "cw20-base" },
                    { text: "cw20-bonding", value: "cw20-bonding" },
                    { text: "cw20-escrow", value: "cw20-escrow" },
                    { text: "cw20-merkle-airdrop", value: "cw20-merkle-airdrop" },
                ],
                token_network: "juno",
                token_network_options: [
                    { text: "Juno", value: "juno"},
                    { text: "Juno - Testnet", value: "juno-testnet"}
                ],
                is_agreement_checked: false,
                // keplr tx
                contract_address: "",
                transaction_hash: "",
                // form flags
                is_submitting: false,
                // form attributes flags
                is_total_supply_disabled_attr: true,
                is_supply_type_disabled_attr: true,
                is_access_type_disabled_attr: true,
                is_verified_source_code_disabled_attr: true,
                is_copyright_off_disabled_attr: true,
                is_token_burnable_disabled_attr: true,
                is_token_mintable_disabled_attr: true,
                is_operable_disabled_attr: true,
                is_token_recoverable_disabled_attr: true,
                is_token_network_disabled_attr: true,
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
                this.errors.access_type = [];
                this.errors.supply_type = [];

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

                this.is_submitting = true;

                if (!this.checkForm() || !await this.isKeplrConnected()) {
                    this.is_submitting = false;
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

                this.is_submitting = false;
            }
        }
    }
</script>

<style>
    .form-group {
        margin-bottom: 1em;
    }
    body .kingyna-gradient {
        background: #ffc8c8!important;
        background: linear-gradient(144.9deg,#ffc8c8 13.67%,#ef7c7c 48.85%,#582727 86.6%)!important;
    }
    .bg-info {
        background-color: #582727!important;
    }
    .bg-success {
        background-color: #ff7171!important;
    }
    .btn-success, .btn-success:hover, .btn-check:active+.btn-success, .btn-check:checked+.btn-success, .btn-success.active, .btn-success:active, .show>.btn-success.dropdown-toggle {
        background-color: #ff7171!important;
        border: #ef7c7c;
    }
    .small, small {
        font-size: 80%;
    }
    a {
        color: #ff7171;
    }
    a:hover {
        color: #582727;
    }
    .bd-footer a:hover {
        color: #ef7c7c;
    }
    a:-webkit-any-link:focus-visible {
        outline-offset: 0;
    }
    .ellipsis {
        width: 60px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>