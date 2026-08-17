// stores/CartStore.js
import { makeAutoObservable, runInAction } from 'mobx'
import { menuStore } from '../store/menuStore'
import { ticketGenerator } from '../utils/ticketGenerator'
import { orderStore } from '../store/orderStore'
import { ORDER_STATUS } from '../utils/consts'
// todo после отладки убрать
import { toJS } from 'mobx'

// toвщ сделать так, что бы сохранялось в localStorage
class BasketStore {
    basketArray = [];
    paymentMethodVar = '';
    orderAmount = 0;
    // себестоимость
    orderCost = 0;
    orderArray = [];

    constructor() {
        makeAutoObservable(this)
    }

    // Добавление элемента в корзину
    addToBasket(menuItemId, quantity = 1) {
        const menuItem = menuStore.getItemById(menuItemId)

        if (!menuItem) {
            console.error('Элемент меню не найден')
            return
        }

        // Проверяем, есть ли уже такой элемент в корзине
        const existingItem = this.basketArray.find(item => item.menuItemId === menuItemId)

        if (existingItem) {
            // Если есть - увеличиваем количество
            existingItem.quantity = quantity
        } else {
            // Если нет - добавляем новый
            this.basketArray.push({
                // а нужен ли он, если все menuItemId уникальны?
                // id: Date.now().toString(), // Уникальный ID для элемента корзины
                menuItemId: menuItemId,
                productName: menuItem.productName,
                quantity: quantity,
                volume: menuItem.volume,
                currency: menuItem.currency,
                measure: menuItem.measure,
                sellPrice: menuItem.sellPrice,
                costPrice: menuItem.costPrice,
                categoryId: this.findItemCategory(menuItemId),
                imageUrl: menuItem.imgPath || '',
                descr: menuItem.descr
            })
        }


        this.calculateTotal()
        this.calculateCost()
    }

    // Поиск категории элемента
    findItemCategory(itemId) {
        for (const category of menuStore.menu.categories) {
            if (category.items?.some(item => item.id === itemId)) {
                return category.id
            }
        }
        return null
    }

    // Удаление элемента из корзины
    removeFromBasket(menuItemId) {
        this.basketArray = this.basketArray.filter(item => item.menuItemId !== menuItemId)
        this.calculateTotal()
    }

    // Изменение количества элемента
    updateQuantity(menuItemId, newQuantity) {
        if (newQuantity < 1) {
            this.removeFromBasket(menuItemId)
            return
        }

        const item = this.basketArray.find(item => item.menuItemId === menuItemId)
        if (item) {
            item.quantity = newQuantity
            this.calculateTotal()
        }
    }

    // Увеличение количества на 1
    incrementQuantity(menuItemId) {
        const item = this.basketArray.find(item => item.menuItemId === menuItemId)
        if (item) {
            item.quantity += 1
            this.calculateTotal()
        }
    }

    // Уменьшение количества на 1
    decrementQuantity(menuItemId) {
        const item = this.basketArray.find(item => item.menuItemId === menuItemId)
        if (item && item.quantity > 1) {
            item.quantity -= 1
            this.calculateTotal()
        } else {
            this.removeFromBasket(menuItemId)
        }
    }

    getItemQuantity(menuItemId) {
        // MobX увидит, что мы читаем basketArray, и подпишет компонент на изменения
        const item = this.basketArray.find(item => item.menuItemId === menuItemId)
        return item ? item.quantity : 0
    }

    // Подсчет общей суммы
    calculateTotal() {
        this.orderAmount = this.basketArray.reduce((total, item) => {
            return total + (item.sellPrice * item.quantity)
        }, 0)
    }

    // Подсчет общей себестоимости
    calculateCost() {
        this.orderCost = this.basketArray.reduce((total, item) => {
            return total + (item.costPrice * item.quantity)
        }, 0)
    }

    // Очистка корзины
    clearBasket() {
        this.basketArray = []
        this.orderAmount = 0
        this.orderCost = 0
        this.paymentMethodVar = ''
    }

    // Обновление метода оплаты
    updateOrderByPaymentMethod(method) {
        this.paymentMethodVar = method
    }

    // Добавление заказа в массив заказов
    confirmOrder() {
        if (this.basketArray.length === 0) return

        const newOrder = {
            // id генерится сам на сервере
            orderNumber: ticketGenerator(),
            items: [...this.basketArray],
            totalAmount: this.orderAmount,
            totalCost: this.orderCost,
            paymentMethod: this.paymentMethodVar,
            status: ORDER_STATUS.COOKING, // new, cooking, ready, delivered
            createdAt: new Date().toISOString(),
            completedAt: null
        }

        orderStore.createOrder(newOrder)

        this.orderArray.push(newOrder)
        this.clearBasket()

        console.log('this.orderArray->', toJS(this.orderArray))
        return newOrder
    }

    get totalOrderQuantity() {
        let totalOrderQuantity = this.basketArray.reduce((summ, item) => summ = summ + item.quantity, 0)
        return totalOrderQuantity
    }

}

export const basketStore = new BasketStore()