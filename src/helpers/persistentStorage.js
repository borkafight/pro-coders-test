export const getItem = key => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    console.log('Error getting data from local storage', error)
    return null
  }
}

export const setItem = (key, data) => {
  try {
    return JSON.stringify(localStorage.setItem(key, data))
  } catch (error) {
    console.log('Error setting data to local storage', error)
  }
}

export const removeItem = key => {
  try {
    return localStorage.removeItem(key)
  } catch (error) {
    console.log('Error removing data from local storage')
  }
}