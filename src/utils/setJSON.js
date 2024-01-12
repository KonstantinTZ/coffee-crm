function setItem(key, value) {
    try {
      return window.localStorage.setItem(key, value)
    } catch (e) {
      console.log(e)
    }
  }

export function setJSON(key, value) {
    try {
      const json = JSON.stringify(value)
  
      setItem(key, json)
    } catch (e) {
      console.error(e)
    }
  }