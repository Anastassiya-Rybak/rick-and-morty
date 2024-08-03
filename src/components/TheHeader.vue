<template>
  <header class="header">
    <div class="header__logo">
      <img src="../assets/images/logo.png" alt="Rick and Morty" />
    </div>
    <nav class="header__nav">
      <ul>
        <li>
          <routerLink to="Home" class="header_link">Главная</routerLink>
        </li>
        <li>
          <routerLink to="Episodes" class="header_link">Эпизоды</routerLink>
        </li>
        <li>
          <routerLink to="Locations" class="header_link">Локации</routerLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup></script>

<style lang="scss" scoped>
.header {
  &__logo {
    width: 80vw;
  }
}
</style>
