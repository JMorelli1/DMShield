const STATUS_KEY = "STATUS_KEY";

const addToLocalStorage = (storeKey, itemToStore) => {
    localStorage.setItem(storeKey, JSON.stringify(itemToStore));
}

const findInLocalStorage = (storeKey) => {
  return JSON.parse(localStorage.getItem(storeKey))
}

export const addStatusesToLocal = async (statuses) => {
  await addToLocalStorage(STATUS_KEY, statuses)
}

export const getStatusesInLocal = () => {
  return findInLocalStorage(STATUS_KEY)
}
