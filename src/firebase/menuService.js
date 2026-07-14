import { db } from './config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

class MenuService {
  async saveMenu(userId, menuData) {
    try {
      const userRef = doc(db, 'users', userId);
      await setDoc(userRef, { menu: menuData }, { merge: true });
      return true;
    } catch (error) {
      console.error('Error saving menu:', error);
      throw error;
    }
  }

  async loadMenu(userId) {
    try {
      const userRef = doc(db, 'users', userId);
      const docSnap = await getDoc(userRef);
      
      if (docSnap.exists()) {
        return docSnap.data().menu || null;
      }
      return null;
    } catch (error) {
      console.error('Error loading menu:', error);
      throw error;
    }
  }

  async updateMenuItem(userId, categoryId, itemId, updates) {
    // Для частичного обновления конкретного элемента меню
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    
    if (docSnap.exists()) {
      const menu = docSnap.data().menu;
      const category = menu.categories.find(c => c.id === categoryId);
      if (category) {
        const itemIndex = category.items.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
          category.items[itemIndex] = { ...category.items[itemIndex], ...updates };
          await setDoc(userRef, { menu }, { merge: true });
        }
      }
    }
  }
}

export const menuService = new MenuService();