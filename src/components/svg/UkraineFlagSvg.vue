<template>
  <svg :width="size" :height="size" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 8">
    <path fill="#005BBB" d="M0 0h12v8H0z" />
    <path fill="#FFD500" d="M0 4h12v4H0z" />
  </svg>
</template>

<script>
export default {
  name: 'CloseSvg',
  props: {
    size: { type: Number, default: 16 }
  }
}
</script>