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
    <ThePaginationBtn class="pagination-button" number="Показать больше" @click="openMore" />
  </section>
</template>

<script setup>
import TheLoading from '@/components/TheLoading.vue'
import ThePaginationBtn from '@/components/ThePaginationBtn.vue'
import TheCharactersCard from '@/components/TheCharactersCard.vue'
import { useApiRequest } from '@/composables/useApiRequest'
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMultiStore } from '@/stores/multi'

const characters = ref(null)
const error = ref(null)
const router = useRouter()
const multiStore = useMultiStore()
const overallInfo = ref(null)
const activePage = ref(1)

const fetchCharacters = async () => {
  const data = await useApiRequest(`character?page=${activePage.value}`)
  if (data.error) {
    error.value = data.error
  } else {
    if (characters.value && overallInfo.value.pages >= activePage.value) {
      characters.value = characters.value.concat(data.results)
    } else {
      characters.value = data.results
      overallInfo.value = data.info
    }
  }
}

const openMore = () => {
  activePage.value++
  fetchCharacters()
}

const jumpToCharacter = (character) => {
  multiStore.updateData(character)
  router.push('/' + character.id)
}

onBeforeMount(() => {
  fetchCharacters()
})
</script>

<style lang="scss" scoped>
@import './../assets/vars';

.home-view {
  margin: 5vh auto 5vh auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 2vh;
  font-size: calcFlexFontSize(28, 32);

  ul {
    margin: 0 auto;
    display: flex;
    flex-wrap: wrap;
    row-gap: 2vw;
    justify-content: space-evenly;

    li {
      width: calc(33% - 1%);

      @include media(1220px) {
        width: calc(16% - 1%);
      }
    }
  }
}
</style>
