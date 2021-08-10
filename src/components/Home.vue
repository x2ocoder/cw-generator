<template>
    <!-- NAV -->
    <CustomNav v-model:address="address"/>

    <!-- JUMBOTRON -->
    <div class="mb-0 juno-gradient text-white">
        <div class="container p-5">
            <h1 class="display-5 fw-bold">Create your CW20 Token</h1>

            <p class="lead">
                Easily deploy Smart Contract for a Standard, Capped, Mintable, Burnable CW20 Token.
                <br>
                CW20 Generator is the easiest and fastest way to create your own CW20 token on the Juno network. No coding skills are required.
            </p>
        </div>
    </div>

    <!-- FORM -->
    <ContractForm v-model:address="address"/>
</template>

<script>
    import KeplrConnection from "../lib/KeplrConnection"
    import CustomNav from './Nav'
    import ContractForm from './ContractForm'

    export default {
        name: "Home",
        components: {
            CustomNav,
            ContractForm,
        },
        provide: { keplr: KeplrConnection },
        data() {
            return {
                address: ''
            }
        },
        mounted() {
            window.addEventListener("keplr_keystorechange", async () => {
                this.keplr = await KeplrConnection.selfUpdate();
                this.address = this.keplr.address;
            });
        },
    }
</script>
