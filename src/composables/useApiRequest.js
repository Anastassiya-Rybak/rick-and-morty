export const useApiRequest = async (target) => {
  let response

  try {
    response = await fetch(`https://rickandmortyapi.com/api/${target}`)
    if (response.ok) {
      return await response.json()
    }
  } catch (error) {
    console.error('Ошибка получения:', error)
    return { response: null, error: error.message }
  }
}
