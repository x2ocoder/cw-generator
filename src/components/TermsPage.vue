<template>
  <!-- NAV -->
  <custom-nav v-model:address="address"/>

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

  <div class="row mx-0">
    <div class="mb-3 p-0 col-lg-12 col-xl-10 offset-xl-1">
      <div class="card bg-transparent border-0">
        <div class="card-body">
          <h3>Terms (wip)</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CustomNav from "./Nav"

export default {
  name: 'TermsPage',
  components: {
    CustomNav
  }
}
</script>
