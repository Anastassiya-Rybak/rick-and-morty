<template>
  <header class="header container">
    <div class="header__logo">
      <img src="/images/logo.png" alt="Rick and Morty" />
    </div>
    <nav class="header__nav">
      <ul>
        <li>
          <routerLink to="Home" class="header__link">ГЛАВНАЯ</routerLink>
        </li>
        <li>
          <routerLink to="Episodes" class="header__link">ЭПИЗОДЫ</routerLink>
        </li>
        <li>
          <routerLink to="Locations" class="header__link">ЛОКАЦИИ</routerLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup></script>

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
    font-family: 'Kaph';
    font-size: 0.8em;
    color: $main-light;
    text-shadow: 0 0.5em 0.5em #1b99306c;

    @include hover {
      text-shadow:
        0 0 0.2em rgba(17, 63, 15, 0.692),
        0 0 0.8em $accent;
    }
  }
}
</style>
