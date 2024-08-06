import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMultiStore = defineStore('multi', () => {
  const data = ref(null)

  const updateData = (currentData) => {
    data.value = currentData
  }

  const saveData = (path) => {
    if (data.value) {
      const dataToSave = JSON.stringify(data.value)
      sessionStorage.setItem(path, dataToSave)
    }
  }

  const reset = () => {
    data.value = null
  }

  return { data, updateData, saveData, reset }
})
