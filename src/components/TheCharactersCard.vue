<template>
  <article class="character-card">
    <div class="character-card__img">
      <img :src="props.image" :alt="props.name" />
    </div>
    <h3 class="character-card__title">{{ characterName }}</h3>
  </article>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    require: true,
    default: ''
  },
  image: {
    type: String,
    require: true
  }
})

const characterName = computed(() => {
  return props.name.length >= 18 ? props.name.slice(0, 16) + '...' : props.name
})
</script>

<style lang="scss" scoped>
@import './../assets/vars';

.character-card {
  width: 100%;
  position: relative;
  margin: 0 auto;

  &__img {
    width: 90%;
    height: 100%;
    margin: 0 auto;
    border-radius: 50%;
    overflow: hidden;
    box-shadow: inset 0 0 2em 0 black;
    border: 0.4em solid $accent;

    img {
      border-radius: 50%;
      object-fit: cover;
      position: relative;
      z-index: -2;
    }

    @include hover {
      box-shadow: none;
    }
  }

  &__title {
    position: absolute;
    bottom: 10%;
    right: 5%;

    padding: 0 0.5em 0 0.5em;

    font-size: 0.6rem;
    background-color: #fff;
    color: black;
  }
}
</style>
