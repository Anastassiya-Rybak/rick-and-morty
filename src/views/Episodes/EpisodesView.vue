<template>
  <div class="episode-page container">
    <TheLoading v-if="!episodesList" />
    <ul class="episode-page__list episode-list" v-else>
      <li @click="jumpToEpisode(episode)" v-for="episode in episodesList" :key="episode">
        <h4>{{ episode.name }}</h4>
        <span>{{ episode.air_date }}</span>
      </li>
    </ul>
    <div class="pagination" v-if="overallInfo">
      <ThePaginationBtn
        class="pagination__item"
        :class="{ pagination__item_active: idx + 1 === activePage }"
        v-for="(page, idx) in overallInfo.pages"
        :key="page"
        :number="idx + 1"
        @click="jumpToAnotherPage(idx + 1)"
      />
    </div>
  </div>
</template>

<script setup>
import TheLoading from '@/components/TheLoading.vue'
import ThePaginationBtn from '@/components/ThePaginationBtn.vue'
import { useApiRequest } from '@/composables/useApiRequest'
import { onBeforeUpdate, onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useMultiStore } from '@/stores/multi'

const episodesList = ref(null)
const route = useRouter()
const multiStore = useMultiStore()
const overallInfo = ref(null)
const activePage = ref(1)

const fetchEpisodes = async (num) => {
  const data = await useApiRequest(`episode?page=${num}`)
  episodesList.value = data.results
  overallInfo.value = data.info
}

const jumpToEpisode = (episode) => {
  route.push('/Episodes/' + episode.id)
}

const jumpToAnotherPage = (num) => {
  fetchEpisodes(num)
  activePage.value = num
}

onBeforeMount(() => {
  fetchEpisodes(1)
})

onBeforeUpdate(() => {
  multiStore.updateData(episodesList.value)
})
</script>

<style lang="scss" scoped>
@import '@/assets/vars';

.episode-page {
  padding: 3vh 0 2vh;
}

.episode-list li {
  display: flex;
  justify-content: space-between;
  padding: 1vw 1vw;

  @include hover {
    transform: scale(1.05);
  }

  &:nth-child(odd) {
    background-color: rgba(240, 248, 255, 0.479);
  }

  h4,
  span {
    display: inline;
  }

  h4 {
    font-size: 0.9em;
    letter-spacing: 0.05em;
  }

  span {
    font-size: 0.8em;
  }
}

.pagination {
  padding: 1vh 2vw 0;
  display: flex;
  justify-content: space-around;

  &__item {
    opacity: 0.6;

    @include hover {
      opacity: 1;
      transform: scale(1.1);
    }

    &_active {
      opacity: 1;
    }
  }
}
</style>
