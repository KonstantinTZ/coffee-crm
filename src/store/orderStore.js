import { makeAutoObservable, runInAction } from 'mobx'
import { orderService } from '../firebase/orderService'
import { auth } from '../firebase/config'
import { ORDER_STATUS } from '../utils/consts'

class OrderStore {

    orders = [];

    unsubscribe = null;

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
    // Отключиться
    // ======================================

    unsubscribeOrders() {

        if (this.unsubscribe) {

            this.unsubscribe()

            this.unsubscribe = null

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

        return this.orders.filter(
            order => order.status === ORDER_STATUS.COMPLETED
        )

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
    // todo доделать, работает не корректно

    exportArray = []

    get exportData() {
        let newExportObj = {}
        for (let item of this.orders) {
            newExportObj.order_date = new Date(item.orderCreatedAt).toLocaleDateString()
            newExportObj.order_creating_time = item.orderTime
            newExportObj.order_prepairing_time = new Date(item.orderPrepairedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
            newExportObj.order_number = item.orderNumber
            newExportObj.order_summ = item.orderTotlaAmaunt
            newExportObj.order_payment_method = item.orderPaidBy

            // newExportObj.order_items = JSON.stringify(item.orderItemsArray.filter((item) => item.productName))
            this.exportArray.push(newExportObj)
        }
        return this.exportArray
    }

}

export const orderStore = new OrderStore()