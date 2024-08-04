<template>
  <section class="home-view container">
    <ul>
      <li>
        <routerLink>
          <article>
            <div>
              <img src="" alt="" />
            </div>
            <h3></h3>
          </article>
        </routerLink>
      </li>
    </ul>
  </section>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'

const characters = null
const loading = ref(true)

onBeforeMount(() => {})
</script>

<style lang="scss" scoped></style>
