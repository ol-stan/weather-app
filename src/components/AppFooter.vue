<template>
  <footer class="footer">
    <div class="footer-text">{{ $t('footer.text') }}</div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style lang="scss">
.footer {
  min-height: 60px;
  width: 100%;
  padding: 20px;
  background: var(--primary-color);

  .night-mode & {
    background: var(--primary-color-nm);
  }

  &-text {
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--white-color);
    font-weight: 500;
  }

  @media screen and (max-width: 520px) {
    margin: 0 0 56px 0;
  }
}
</style>