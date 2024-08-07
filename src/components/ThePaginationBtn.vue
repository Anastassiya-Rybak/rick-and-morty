<template>
  <button>{{ props.number }}</button>
</template>

<script setup>
const props = defineProps({
  number: {
    type: Number || String,
    requier: true
  }
})
</script>

<style lang="scss" scoped>
@import '@/assets/vars';
button {
  background-color: $accent;
  border: none;
  border-radius: 20%;
  box-shadow: 1px 0 1vw 0 rgba(0, 0, 0, 0.233);
  padding: 1vw 2vw;

  @include accentText($size: 0.9em);
}
</style>
