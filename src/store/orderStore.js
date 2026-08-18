import { makeAutoObservable, runInAction } from 'mobx'
import { orderService } from '../firebase/orderService'
import { auth } from '../firebase/config'
import { ORDER_STATUS } from '../utils/consts'

class OrderStore {

    orders = [];

    history = []

    unsubscribe = null;

    historyUnsubscribe = null;

    loading = false;

    constructor() {
        makeAutoObservable(this)
    }

    // ======================================
    // Подключиться к Firestore
    // ======================================

    subscribe(userId) {

        if (this.unsubscribe) {
            this.unsubscribe()
        }

        this.loading = true

        this.unsubscribe = orderService.subscribeOrders(
            userId,
            (orders) => {
                console.log("Firestore update:", orders)

                runInAction(() => {

                    this.orders = orders

                    this.loading = false

                })

            }
        )

    }

    // ======================================
    // подписка для истории, что бы фильтровать по дате
    // ======================================

    subscribeHistoryByDate(startDate, endDate) {

        const user = auth.currentUser

        if (!user) return

        if (this.unsubscribeHistory) {
            this.unsubscribeHistory()
        }

        this.loading = true

        this.unsubscribeHistory =
            orderService.subscribeHistoryByDate(
                user.uid,
                startDate,
                endDate,
                (orders) => {

                    runInAction(() => {

                        this.history = orders

                        this.loading = false

                    })

                }
            )

    }

    // ======================================
    // Отключиться
    // ======================================

    unsubscribeOrders() {

        if (this.unsubscribe) {

            this.unsubscribe()

            this.unsubscribe = null

        }

    }

    unsubscribeHistory() {

        if (this.historyUnsubscribe) {

            this.historyUnsubscribe()

            this.historyUnsubscribe = null

        }

    }



    // ======================================
    // Создать заказ
    // ======================================

    async createOrder(order) {
        const user = auth.currentUser
        if (!user) return

        await orderService.createOrder(auth.currentUser.uid, order)

    }

    // ======================================
    // Изменить статус
    // ======================================

    async updateStatus(orderId, status) {
        const user = auth.currentUser
        if (!user) return

        await orderService.updateOrderStatus(
            auth.currentUser.uid,
            orderId,
            status
        )

    }

    // ======================================
    // Обновить заказ
    // ======================================

    async updateOrder(orderId, updates) {

        const user = auth.currentUser

        if (!user) return

        await orderService.updateOrder(
            auth.currentUser.uid,
            orderId,
            updates
        )

    }

    // ======================================
    // Удалить заказ
    // ======================================

    async deleteOrder(orderId) {
        const user = auth.currentUser
        if (!user) return

        await orderService.deleteOrder(
            auth.currentUser.uid,
            orderId
        )

    }

    // ======================================
    // Все заказы
    // ======================================

    get allOrders() {

        return this.orders

    }

    // ======================================
    // Кухня
    // ======================================

    get kitchenOrders() {

        return this.orders.filter(
            order => order.status === ORDER_STATUS.COOKING
        )

    }

    // ======================================
    // Выдача
    // ======================================

    get releaseOrders() {

        return this.orders.filter(
            order => order.status === ORDER_STATUS.READY
        )

    }

    // ======================================
    // История
    // ======================================

    get historyOrders() {

        return this.history

    }

    // ======================================
    // Табло
    // ======================================

    get boardCookingOrders() {

        return this.kitchenOrders

    }

    get boardReadyOrders() {

        return this.releaseOrders

    }


    // =======================================
    // Экспорт в Эксель
    // =======================================

    get exportData() {

        return this.history.map((item) => {

            const createdAt = item.createdAt?.toDate()
            const completedAt = item.completedAt?.toDate()

            return {

                'Дата заказа': createdAt
                    ? createdAt.toLocaleDateString()
                    : '',
                'Номер заказа': item.orderNumber,

                'Время создания': createdAt
                    ? createdAt.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                    : '',

                'Время готовности': completedAt
                    ? completedAt.toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                    : '',

                'Способ оплаты': item.paymentMethod,

                'Позиции': item.items
                    ?.filter(item => item.productName)
                    .map(item =>
                        `${item.productName} × ${item.quantity}`
                    )
                    .join(', ') || '',

                'Сумма заказа': item.totalAmount,
                'Себестоимость заказа': item.totalCost,

            }

        })

    }

}

export const orderStore = new OrderStore()