export const getFromStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || "[]");
};
export const saveToStorage = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};
