<template>
  <div class="loader"></div>
</template>

<style scoped lang="scss">
.loader {
  display: inline-block;
  background: var(--yellow-color);
  width: 30px;
  height: 30px;
  position: relative;
  text-align: center;
  transform: rotate(20deg);
  animation: rot 5s linear infinite;
}

.loader:before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 30px;
  width: 30px;
  background: var(--yellow-color);
  transform: rotate(135deg);
}

@keyframes rot {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(720deg);
  }
}
</style>