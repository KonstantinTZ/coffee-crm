function getItem(key, value) {
    try {
      return window.localStorage.getItem(key)
    } catch (e) {
      console.log(e)
    }
  }

export function getJSON(key) {
    try {
      const json = getItem(key)
  
      return JSON.parse(json)
    } catch (e) {
      console.error(e)
    }
  }