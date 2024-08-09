<template>
  <div class="episode-page container">
    <TheLoading v-if="loading" />
    <section v-else class="episode-page__info">
      <h2>{{ episodeData.name }}</h2>
      <span><b>Дата выхода:</b> {{ episodeData.air_date }}</span>
    </section>
    <section class="episode-page__links">
      <h2>задействованы персонажи:</h2>
      <ul v-if="!loading">
        <li v-for="(item, idx) in episodeData.characters" :key="idx">
          <routerLink :to="'/' + getLinkId(item)">
            <figure class="episode-page__image">
              <img
                :src="
                  'https://rickandmortyapi.com/api/character/avatar/' + getLinkId(item) + '.jpeg'
                "
                alt="Персонаж"
              />
            </figure>
          </routerLink>
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup>
import { useMultiStore } from '@/stores/multi'
import { useApiRequest } from '@/composables/useApiRequest'
import { useFindData } from '@/composables/useFindData'
import TheLoading from '@/components/TheLoading.vue'
import { onBeforeUnmount, onBeforeUpdate, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const multiStore = useMultiStore()
const loading = ref(true)

const episodeData = ref(null)

const fetchEpisode = async () => {
  const data = await useApiRequest(`episode/${route.params.id}`)
  episodeData.value = data
}

const findData = () => {
  const foundData = useFindData()
  if (foundData) {
    episodeData.value = foundData
  } else {
    fetchEpisode()
  }
}

const getLinkId = (str) => {
  const strToArr = str.split('/')
  return strToArr[strToArr.length - 1]
}

watch(episodeData, () => {
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
@import '@/assets/vars';

.episode-page {
  padding: 3vh 0 2vh;
  font-size: calcFlexFontSize(24, 32);

  &__info {
    padding: 2vh 1vw;
    border-radius: 0.5em;
    background-color: $accent;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1vh;

    h2 {
      @include accentText();
      font-size: 1em;
      text-align: center;
    }

    span,
    span b {
      color: rgb(87, 86, 86);
      font-size: 0.7em;
      opacity: 0.9;
      text-transform: uppercase;
    }
  }

  &__links {
    h2 {
      text-transform: uppercase;
      font-size: 0.9em;
      font-weight: 100;
      margin: 2vh 0;
    }

    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;

      li {
        width: 25%;

        @include hover {
          scale: (1.1);
          z-index: 4;
        }

        @include media(1020px) {
          width: 16.6%;
        }
      }
    }
  }

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
}
</style>
