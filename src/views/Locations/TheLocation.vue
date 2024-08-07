<template>
  <div class="location-page container">
    <TheLoading v-if="loading" />
    <section v-else class="location-page__info">
      <h2>{{ locationData.name }}</h2>
      <span><b>Тип: </b> {{ locationData.type }} </span>
      <span><b>Измерение: </b> {{ locationData.dimension }} </span>
    </section>
    <section class="location-page__links">
      <h2>резиденты:</h2>
      <ul v-if="!loading">
        <li v-for="(item, idx) in locationData.residents" :key="idx">
          <routerLink :to="'/' + getLinkId(item)">
            <figure class="location-page__image">
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

const locationData = ref(null)

const fetchLocation = async () => {
  const data = await useApiRequest(`location/${route.params.id}`)
  locationData.value = data
}

const findData = () => {
  const foundData = useFindData()
  if (foundData) {
    locationData.value = foundData
  } else {
    fetchLocation()
  }
}

const getLinkId = (str) => {
  const strToArr = str.split('/')
  return strToArr[strToArr.length - 1]
}

watch(locationData, () => {
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

.location-page {
  padding: 3vh 0 2vh;

  &__info {
    padding: 2vh 1vw;
    border-radius: 0.5em;
    background-color: $accent;
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1vh;

    h2 {
      @include accentText(1em);
      text-align: center;
    }

    span,
    span b {
      color: rgb(87, 86, 86);
      font-size: 0.9em;
      opacity: 0.9;
      text-transform: uppercase;
    }
  }

  &__links {
    h2 {
      text-transform: uppercase;
      font-size: 1.3em;
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
