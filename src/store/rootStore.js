import authStore from './authStore';

const stores = {
  auth: authStore
};

// Для удобного использования в компонентах
export default stores;

// Хук для использования в функциональных компонентах
export function useStores() {
  return stores;
}