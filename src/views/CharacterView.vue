<template>
  <div class="character-page-wrapper container">
    <section class="character-page">
      <TheLoading v-if="loading" />
      <article v-else class="character-page__info characters-info">
        <figure class="characters-info__image">
          <img :src="characterData.image" :alt="characterData.name" />
        </figure>
        <header class="characters-info__header">
          <h2>{{ characterData.name }}</h2>
        </header>
        <section class="characters-info__content">
          <ul>
            <li><b>Статус:</b> {{ characterData.status }}</li>
            <li><b>Вид:</b> {{ characterData.species }}</li>
            <li><b>Пол:</b> {{ characterData.gender }}</li>
            <li>
              <b>Месторождение: </b>
              <router-link
                :to="'/Locations/' + getLinkId(characterData.origin.url)"
                style="color: #679c38; text-align: right"
              >
                {{ characterData.origin.name }}
              </router-link>
            </li>
            <li>
              <b>Местоположение: </b>
              <router-link
                :to="'/Locations/' + getLinkId(characterData.location.url)"
                style="color: #679c38; text-align: right"
              >
                {{ characterData.location.name }}
              </router-link>
            </li>
          </ul>
        </section>
      </article>
    </section>
    <section class="episode-links">
      <h2>эпизоды с персонажем:</h2>
      <TheListItem v-if="!loading" :listContent="characterData.episode" path="Episodes" />
    </section>
  </div>
</template>

<script setup>
import TheListItem from '@/components/TheListItem.vue'
import { useMultiStore } from '@/stores/multi'
import { useApiRequest } from '@/composables/useApiRequest'
import { useFindData } from '@/composables/useFindData'
import TheLoading from '@/components/TheLoading.vue'
import { onBeforeUnmount, onBeforeUpdate, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const multiStore = useMultiStore()
const loading = ref(true)

const characterData = ref(null)

const fetchCharacter = async () => {
  const data = await useApiRequest(`character/${route.params.id}`)
  characterData.value = data
}

const findData = () => {
  const foundData = useFindData()
  if (foundData) {
    characterData.value = foundData
  } else {
    fetchCharacter()
  }
}

const getLinkId = (str) => {
  const strToArr = str.split('/')
  return strToArr[strToArr.length - 1]
}

watch(characterData, () => {
  loading.value = false
})

onMounted(() => {
  findData()
})

onBeforeUpdate(() => {
  multiStore.saveData(route.fullPath)
})

onBeforeUnmount(() => {
  multiStore.reset(route.fullPath)
})
</script>

<style lang="scss" scoped>
@import './../assets/vars';

.character-page-wrapper {
  font-size: calcFlexFontSize(24, 42);

  @include media(720px) {
    display: flex;
    justify-content: space-between;
  }

  @include media(1220px) {
    justify-content: center;
  }
}

.character-page {
  background-color: $main-light;
  border-radius: 1%;
  overflow: hidden;
  padding: 7vw;
  margin-top: 5vh;
  height: fit-content;
  box-shadow: 0 0.5vh 0.5vh 1px rgba(0, 0, 0, 0.089);

  @include media(880px) {
    width: 60%;
    padding: 5%;
  }

  @include media(1020px) {
    padding: 5%;
    margin-top: 3vh;
  }

  @include media(1220px) {
    padding: 3%;
    width: 40%;
  }
}

.characters-info {
  &__image {
    position: relative;
    box-shadow: 0 0 0.15em 0 rgba(0, 0, 0, 0.466);

    &::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
      box-shadow: inset 0 0 0.8em 0 rgb(248, 248, 248) !important;
    }

    img {
      object-fit: cover;
    }
  }

  &__header h2 {
    @include accentText;
    font-size: 1em;
    color: rgba(0, 0, 0, 0.404);
    text-align: center;
    margin: 2vh auto;
  }

  &__content ul li {
    text-align-last: justify;
    color: black;
    line-height: 1.5em;
    font-size: 0.5em;
    border-bottom: 0.5px solid black;

    b {
      font-size: 0.9em;
      color: black;
    }
  }
}

.episode-links {
  padding: 1vh 5px 8vh;

  h2 {
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: 100;
    line-height: 2em;
  }
}
</style>
