<template>
  <header class="header">
    <div class="logo">
      <router-link to="/" class="logo-link">
        <img class="logo-img" alt="Weather App logo" src="../assets/logo.png">
      </router-link>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style lang="scss">
.header {
  min-height: 100px;
  width: 100%;
  background: var(--primary-color);

  .night-mode & {
    background: var(--primary-color-nm);
  }
}

.logo {
  max-width: 140px;
  margin: 0 auto;

  &-link {
    display: inline-block;
    margin: 20px 0 16px;
  }

  &-img {
    width: 100%;
  }
}
</style>