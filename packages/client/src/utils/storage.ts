export const getLocalStorageItem = <T>(key: string): Partial<T> => {
  try {
    const raw = localStorage.getItem(key);
    const json = JSON.parse(raw || "{}");

    return json;
  } catch (error) {
    return {};
  }
};

export const setLocalStorageItem = <T>(key: string, data: Partial<T>) => {
  try {
    const currentData = getLocalStorageItem(key);
    const json = { ...currentData, ...data };
    const raw = JSON.stringify(json);

    localStorage.setItem(key, raw);

    return true;
  } catch (error) {
    return false;
  }
};
