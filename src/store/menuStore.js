// stores/MenuStore.js
import { makeAutoObservable, runInAction } from 'mobx'
import { menuService } from '../firebase/menuService'
import { auth } from '../firebase/config'

class MenuStore {
  menu = { categories: [] };
  isLoading = false;
  error = null;
  isSaving = false;

  constructor() {
    makeAutoObservable(this)
  }

  // Загрузка меню из Firebase
  async loadMenuFromFirebase() {
    const user = auth.currentUser
    if (!user) return

    this.isLoading = true
    this.error = null

    try {
      const menuData = await menuService.loadMenu(user.uid)
      runInAction(() => {
        if (menuData) {
          this.menu = menuData
        }
        this.isLoading = false
      })
    } catch (error) {
      runInAction(() => {
        this.error = error.message
        this.isLoading = false
      })
    }
  }

  // Сохранение меню в Firebase
  async saveMenuToFirebase() {
    const user = auth.currentUser
    if (!user) return

    this.isSaving = true
    try {
      await menuService.saveMenu(user.uid, this.menu)
      runInAction(() => {
        this.isSaving = false
      })
      console.log("сработал saveMenuToFirebase")
    } catch (error) {
      runInAction(() => {
        this.error = error.message
        this.isSaving = false
      })
    }
  }

  // Локальные методы для работы с меню
  addCategory(category) {
    this.menu.categories.push({
      name: category,
      id: Date.now().toString(),
      items: []
    })
    this.saveMenuToFirebase() // Автосохранение
  }

  addItemToCategory(categoryId, item) {
    const category = this.menu.categories.find(c => c.id === categoryId)
    if (category) {
      category.items.push({
        ...item,
        id: Date.now().toString()
      })
      console.log("сработал addItemToCategory")
      this.saveMenuToFirebase() // Автосохранение
    }
  }
  // новое

  // 🆕 Обновление категории (изменение названия)
  updateCategory(categoryId, newName) {
    const category = this.menu.categories.find(c => c.id === categoryId)
    if (category) {
      category.name = newName
      console.log(`Категория обновлена: ${categoryId} -> ${newName}`)
      this.saveMenuToFirebase() // Автосохранение
    } else {
      console.warn(`Категория с id ${categoryId} не найдена`)
    }
  }

  // 🆕 Удаление категории
  removeCategory(categoryId) {
    const categoryIndex = this.menu.categories.findIndex(c => c.id === categoryId)

    if (categoryIndex !== -1) {
      const categoryName = this.menu.categories[categoryIndex].name

      // Удаляем категорию
      this.menu.categories.splice(categoryIndex, 1)
      console.log(`Категория "${categoryName}" удалена`)
      this.saveMenuToFirebase() // Автосохранение
    } else {
      console.warn(`Категория с id ${categoryId} не найдена`)
    }
  }

  // новое

  updateItem(categoryId, itemId, updates) {
    const category = this.menu.categories.find(c => c.id === categoryId)
    if (category) {
      const item = category.items.find(i => i.id === itemId)
      if (item) {
        Object.assign(item, updates)
        this.saveMenuToFirebase() // Автосохранение
      }
    }
  }

  removeItem(categoryId, itemId) {
    const category = this.menu.categories.find(c => c.id === categoryId)
    if (category) {
      category.items = category.items.filter(i => i.id !== itemId)
      this.saveMenuToFirebase() // Автосохранение
    }
  }

  // // Получение списка категорий
  // get categories() {
  //   return this.menu.categories || []
  // }

  // Категории с id и name для select/выпадающих списков
  get categoriesForSelect() {
    return this.menu.categories.map(c => ({
      value: c.id,
      label: c.name
    }))
  }

  // Получить категорию по ID
  getCategoryById(categoryId) {
    const category = this.menu.categories.find(c => c.id === categoryId)

    // Возвращаем объект в нужном формате или null, если категория не найдена
    return category ? { value: category.id, label: category.name } : null
  }

  // фильтр по категориям
  getItemsByCategoryId(categoryId) {
    const category = this.menu.categories.find(c => c.id === categoryId)
    return category ? category.items : []
  }

  // Получение конкретного товара по его ID
  getItemById(itemId) {
    for (const category of this.menu.categories) {
      const item = category.items.find(i => i.id === itemId)
      if (item) return item
    }
    return null // Если товар не найден
  }
}

export const menuStore = new MenuStore()