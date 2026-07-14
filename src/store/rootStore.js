import authStore from './authStore';
import { makeAutoObservable } from 'mobx';
import { menuStore } from './menuStore';
// import { orderStore } from './OrderStore';
import { auth } from '../firebase/config';
import { onAuthStateChanged } from 'firebase/auth';

const stores = {
  auth: authStore,
  menu: menuStore
};

// stores/RootStore.js


// class RootStore {
//   menuStore;
//   // orderStore;
//   isAuthenticated = false;
//   currentUser = null;

//   constructor() {
//     this.menuStore = menuStore;
//     // this.orderStore = orderStore;
//     makeAutoObservable(this);
    
//     this.initAuthListener();
//   }

//   initAuthListener() {
//     onAuthStateChanged(auth, (user) => {
//       this.setCurrentUser(user);
      
//       if (user) {
//         this.isAuthenticated = true;
//         this.currentUser = user;
//         // Загружаем меню пользователя при авторизации
//         this.menuStore.loadMenuFromFirebase();
//       } else {
//         this.isAuthenticated = false;
//         this.currentUser = null;
//       }
//     });
//   }

//   setCurrentUser(user) {
//     this.currentUser = user;
//     this.isAuthenticated = !!user;
//   }
// }

// export const rootStore = new RootStore();

// Для удобного использования в компонентах
export default stores;

// Хук для использования в функциональных компонентах
export function useStores() {
  return stores;
}