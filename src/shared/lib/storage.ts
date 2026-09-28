export const readJson = <T>(storage: Storage, key: string): T | null => {
  try {
    const raw = storage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

export const writeJson = (storage: Storage, key: string, value: unknown): void => {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.warn(`Не удалось сохранить ${key}`, error)
  }
}
