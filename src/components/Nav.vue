<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="https://junochain.com/">
        <img src="juno/logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top">
        Juno
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
              <a class="nav-link" href="#">
                Wallet
                <span class="small d-inline-flex" v-if="address">(Connected with <span class="ellipsis" style="max-width: 60px;">{{address}}</span>)</span>
                <span class="small" v-else v-bind:onclick="retryKeplrConnection">(Not connected)</span>
              </a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Useful Links
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                <li><a class="dropdown-item" href="https://junochain.com/">Juno</a></li>
                <li><a class="dropdown-item" href="http://www.junoscan.com/">JunoScan</a></li>
                <li><a class="dropdown-item" href="https://blueprints.juno.giansalex.dev/">Juno Blueprints</a></li>
                <li><a class="dropdown-item" href="https://www.ezstaking.io/">EZStaking.io — Staking Provider</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
  export default {
    name: "Nav",
    emits: ['update:address'],
    inject: ['keplr'],
    props: {
      address: String
    },
    methods: {
      // only used by template
      async retryKeplrConnection() {
        let isSuccess = false;
        console.debug('Nav::retryKeplrConnection');

        try {
          isSuccess = await this.keplr.retryKeplrConnection();
        } catch (e) {
          console.error(e.toString());
        }

        if (isSuccess) {
          this.$emit("update:address", this.keplr.address);
        }

        return isSuccess;
      },
    }
  };
</script>
