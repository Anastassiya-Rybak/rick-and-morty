import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCharacterStore = defineStore('character', () => {
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

  return { data, updateData, saveData }
})
