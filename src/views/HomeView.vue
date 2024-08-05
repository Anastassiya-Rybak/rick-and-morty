<template>
  <section class="home-view container">
    <h1 hidden>Главная страница</h1>
    <TheLoading v-if="!characters" />
    <ul v-else>
      <li v-for="character in characters" :key="character">
        <TheCharactersCard
          class="home-view__character-card"
          :name="character.name"
          :image="character.image"
          @click="jumpToCharacter(character)"
        />
      </li>
    </ul>
  </section>
</template>

<script setup>
import TheLoading from '@/components/TheLoading.vue'
import TheCharactersCard from '@/components/TheCharactersCard.vue'
import { useApiRequest } from '@/composables/useApiRequest'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCharacterStore } from '@/stores/character'

const characters = ref(null)
const error = ref(null)
const route = useRouter()
const characterStore = useCharacterStore()

const fetchCharacters = async () => {
  const data = await useApiRequest('character')
  if (data.error) {
    error.value = data.error
  } else {
    characters.value = data.results
  }
}

const jumpToCharacter = (character) => {
  characterStore.updateData(character)
  route.push(String(character.id))
}

onBeforeMount(() => {
  fetchCharacters()
})
</script>

<style lang="scss" scoped>
.home-view {
  margin: 5vh auto 5vh auto;

  ul {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    row-gap: 2vw;
    justify-content: space-evenly;

    li {
      width: calc(33% - 1%);
    }
  }
}
</style>
