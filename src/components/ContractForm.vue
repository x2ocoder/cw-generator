<template>
    <h1>cw-generator</h1>
    <h2>Create your Juno Token</h2>

    <div role="alert" aria-live="polite" aria-atomic="true" class="alert alert-danger">
        <h4 class="alert-heading">Alert</h4>
        <p>
            To use this app please install <a href="https://keplr.app/" rel="noopener" target="_blank" class="">Keplr</a>.
            Use any other wallet at your own risk.
        </p>
    </div>

    <form>
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
    export default {
        name: 'ContractForm',
        data: function () {
            return {
                token_name: "",
                token_symbol: "",
                token_decimals: 18,
                initial_supply: 21000000,
            }
        }
    }
</script>

<style>
    .form-group {
        margin-bottom: 1em;
    }
</style>