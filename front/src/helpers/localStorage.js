export function isLocalStorageNameSupported() {
  const testKey = 'test'
  const storage = window.sessionStorage
  try {
    storage.setItem(testKey, '1')
    storage.removeItem(testKey)
    return true
  } catch (error) {
    return false
  }
}

export function useLocalStorage(fn, name, data) {
  if (!isLocalStorageNameSupported()) return
  if (fn === 'getItem') {
    return JSON.parse(localStorage.getItem(name))
  } else if (fn === 'setItem') {
    return localStorage.setItem(name, JSON.stringify(data))
  }
  throw new Error(`localStorage function ${fn} unknown.`)
}
