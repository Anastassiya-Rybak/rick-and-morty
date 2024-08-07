<template>
  <header class="header container">
    <div class="header__logo">
      <img src="/images/logo.png" alt="Rick and Morty" />
    </div>
    <nav class="header__nav">
      <ul>
        <li>
          <a class="header__link" @click.prevent="goToPage()">ГЛАВНАЯ</a>
        </li>
        <li>
          <a class="header__link" @click.prevent="goToPage('Episodes')">ЭПИЗОДЫ</a>
        </li>
        <li>
          <a class="header__link" @click.prevent="goToPage('Locations')">ЛОКАЦИИ</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goToPage = (pathName = null) => {
  if (pathName) {
    router.push({ path: `/${pathName}`, query: { page: '1' } })
  } else {
    router.push({ path: '/' })
  }
}
</script>

<style lang="scss" scoped>
@import './../assets/vars';
.header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;

  &__logo,
  &__nav {
    width: 85vw;
    margin-top: 2.5vh;
  }

  &__nav {
    padding: 0 5% 0 5%;

    ul {
      display: flex;
      justify-content: space-between;
    }
  }

  &__link {
    color: $main-light;
    @include accentText($size: 0.8em);
    @include hover {
      text-shadow:
        0 0 0.2em rgba(17, 63, 15, 0.692),
        0 0 0.8em $accent;
    }
  }
}
</style>
