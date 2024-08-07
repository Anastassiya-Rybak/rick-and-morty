import { useRoute } from 'vue-router'
import { useMultiStore } from '@/stores/multi'

export const useFindData = () => {
  const route = useRoute(),
    multiStore = useMultiStore()

  if (sessionStorage.getItem(route.fullPath)) {
    return JSON.parse(sessionStorage.getItem(route.fullPath))
  } else if (multiStore.data !== null) {
    return multiStore.data
  }

  return null
}
