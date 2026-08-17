import { db } from './config'

import {
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore'

class OrderService {

    // ======================================
    // users/{uid}/orders
    // ======================================

    getOrdersRef(userId) {
        return collection(db, 'users', userId, 'orders')
    }

    // ======================================
    // Создание заказа
    // ======================================

    async createOrder(userId, orderData) {

        try {

            const docRef = await addDoc(
                this.getOrdersRef(userId),
                {
                    ...orderData,

                    status: 'cooking',

                    createdAt: serverTimestamp(),

                    completedAt: null
                }
            )

            return docRef.id

        } catch (error) {

            console.error('createOrder', error)

            throw error
        }

    }

    // ======================================
    // Получить все заказы (однократно)
    // ======================================

    async loadOrders(userId) {

        const q = query(
            this.getOrdersRef(userId),
            orderBy('createdAt')
        )

        const snapshot = await getDocs(q)

        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))

    }

    // ======================================
    // Подписка на ВСЕ заказы
    // ======================================

    subscribeOrders(userId, callback) {

        const q = query(
            this.getOrdersRef(userId),
            orderBy('createdAt')
        )

        return onSnapshot(q, (snapshot) => {

            const orders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            callback(orders)

        })

    }

    // ======================================
    // Подписка по статусу
    // ======================================

    subscribeOrdersByStatus(userId, status, callback) {

        const q = query(
            this.getOrdersRef(userId),
            where('status', '==', status),
            orderBy('createdAt')
        )

        return onSnapshot(q, (snapshot) => {

            const orders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            callback(orders)

        })

    }

    // ======================================
    // Подписка по дате
    // ======================================

    subscribeHistoryByDate(userId, startDate, endDate, callback) {

        const q = query(
            this.getOrdersRef(userId),

            where(
                'status',
                '==',
                'completed'
            ),

            where(
                'createdAt',
                '>=',
                Timestamp.fromDate(startDate)
            ),

            where(
                'createdAt',
                '<',
                Timestamp.fromDate(endDate)
            ),

            orderBy('createdAt', 'desc')
        )

        return onSnapshot(q, (snapshot) => {

            const orders = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }))

            callback(orders)

        })

    }

    // ======================================
    // Получить один заказ
    // ======================================

    async getOrder(userId, orderId) {

        const orderRef = doc(
            db,
            'users',
            userId,
            'orders',
            orderId
        )

        const snap = await getDoc(orderRef)

        if (!snap.exists()) {

            return null

        }

        return {

            id: snap.id,

            ...snap.data()

        }

    }

    // ======================================
    // Изменить статус
    // ======================================

    async updateOrderStatus(userId, orderId, status) {

        const orderRef = doc(
            db,
            'users',
            userId,
            'orders',
            orderId
        )

        const data = {

            status

        }

        if (status === 'completed') {

            data.completedAt = serverTimestamp()

        }

        await updateDoc(orderRef, data)

    }

    // ======================================
    // Обновить заказ
    // ======================================

    async updateOrder(userId, orderId, updates) {

        const orderRef = doc(
            db,
            'users',
            userId,
            'orders',
            orderId
        )

        await updateDoc(orderRef, updates)

    }

    // ======================================
    // Удалить заказ
    // ======================================

    async deleteOrder(userId, orderId) {

        const orderRef = doc(
            db,
            'users',
            userId,
            'orders',
            orderId
        )

        await deleteDoc(orderRef)

    }

}

export const orderService = new OrderService()