<template>
  <div class="location-page container">
    <TheLoading v-if="!locationList" />
    <TheListItem v-else :listContent="locationList" path="Locations" />
    <div class="pagination" v-if="overallInfo">
      <ThePaginationBtn
        class="pagination__item"
        :class="{ pagination__item_active: idx + 1 == activePage }"
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
import TheListItem from '@/components/TheListItem.vue'
import { useApiRequest } from '@/composables/useApiRequest'
import { useFindData } from '@/composables/useFindData'
import { onBeforeUpdate, onBeforeMount, onBeforeUnmount, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useMultiStore } from '@/stores/multi'

const locationList = ref(null)
const router = useRouter()
const route = useRoute()
const multiStore = useMultiStore()
const overallInfo = ref(null)
const activePage = ref(route.query.page)

const fetchLocations = async (num) => {
  const data = await useApiRequest(`location?page=${num}`)
  locationList.value = data.results
  overallInfo.value = data.info
}

const jumpToAnotherPage = (num) => {
  activePage.value = num
}

const findData = () => {
  const foundData = useFindData()
  if (foundData) {
    locationList.value = foundData
  } else {
    fetchLocations(route.query.page)
  }
}

watch(activePage, (newValue) => {
  router.push({ path: 'Locations', query: { page: newValue } })
  fetchLocations(newValue)
})

onBeforeMount(() => {
  findData()
})

onBeforeUpdate(() => {
  multiStore.updateData(locationList.value)
})

onBeforeUnmount(() => {
  multiStore.reset(route.fullPath)
})
</script>

<style lang="scss" scoped>
@import '@/assets/vars';

.location-page {
  padding: 3vh 0 2vh;
  font-size: calcFlexFontSize(22, 30);
  @include media(1220px) {
    width: 60%;
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
