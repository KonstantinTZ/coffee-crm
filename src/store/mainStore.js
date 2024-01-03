import { makeAutoObservable } from 'mobx'
import { menuPresetArray } from './menuPreset'
import { v4 as uuidv4 } from 'uuid';
import { ticketGenerator } from '../utils/ticketGenerator'

class mainStore {

    constructor() {
        makeAutoObservable(this)
    }

    // ====================================================================
    // Menu operations start

    menuArray = []



    copyMenuArray() {
        this.menuArray = JSON.parse(JSON.stringify(menuPresetArray))
        this.menuArray.forEach(function (item) {
            item.quantity = 0
            item.prepaired = false
        })
    }



    changeQuantityFn(id, direction) {

        if (direction === true) {
            this.menuArray = this.menuArray.map(menuItem => menuItem.id === id ? { ...menuItem, quantity: (menuItem.quantity < 10 ? menuItem.quantity + 1 : menuItem.quantity) } : menuItem)
            // с ограничением на максимальный счетчик 10
        } else if (direction === false) {
            this.menuArray = this.menuArray.map(menuItem => menuItem.id === id ? { ...menuItem, quantity: (menuItem.quantity > 0 ? menuItem.quantity - 1 : menuItem.quantity) } : menuItem)
            // с ограничением на минимальный счетчик 0
        }

    }

    // ====================================================================
    // Menu operations end

    // ====================================================================
    // basket operations start

    basketArray = []

    addToBasketFn(id) {

        // при клике фильтруем массив с меню и выделяем объект с продуктом

        const pickedItem = this.menuArray.find(function (item) {
            return item.id === id;
        });

        // находим в массиве корзины элемент с таким же АйДи
        const equalityItemInBasketArray = this.basketArray.find(basketItem => basketItem.id === id);
        // если он существует, то методом мап обновляем его значения
        if (equalityItemInBasketArray) {
            this.basketArray = this.basketArray.map(basketItem => basketItem.id === id ? { ...basketItem, quantity: pickedItem.quantity } : basketItem)

            // в противном случае добовляем элемент из меню
        } else {
            this.basketArray.push(pickedItem);
        }

        // при удалении получается лишняя операция !!!!

        // если количество в элементе меню 0, тогда находим такой же элемент в корзине и удаляем его
        if (pickedItem.quantity === 0) {
            this.basketArray = this.basketArray.filter(basketItem => basketItem.id !== id)
        }


    }

    get orderAmount() {
        // let totalSellPrice = this.basketArray.reduce((summ, item) => summ = summ + item.sellPrice, 0)
        // let totalQuantity = this.basketArray.reduce((summ, item) => summ = summ + item.quantity, 0)

        // console.log(totalSellPrice, totalQuantity)

        this.basketArray.forEach((item) => item.productAmount = item.quantity * item.sellPrice)


        let totalAmount = this.basketArray.reduce((summ, item) => summ = summ + item.productAmount, 0)

        return totalAmount
    }

    get totalOrderQuantity() {
        let totalOrderQuantity = this.basketArray.reduce((summ, item) => summ = summ + item.quantity, 0)
        return totalOrderQuantity
    }

    basketArrayCleaner() {
        this.basketArray.splice(0, this.basketArray.length);
    }


    // ====================================================================
    // basket operations end

    // ====================================================================
    // Order operations start

    // newOrder = {
    //     orderId: '',
    //     orderNumber: 'N95',
    //     orderCreatedAt: '',
    //     orderPrepairedAt: '',
    //     orderReleasedAt: '',
    //     paidBy: '',
    //     orderTotlaAmaunt: 1,
    //     orderPositionsArray: []

    // }


    orderArray = []
    paymentMethodVar = ''

    updateOrderByPaymentMethod(value) {
        this.paymentMethodVar = value;
    }

    addToOrderArray() {
        let newOrder = {};

        newOrder.orderId = uuidv4();
        newOrder.orderNumber = ticketGenerator();
        newOrder.orderCreatedAt = new Date();
        newOrder.orderPrepairedAt = '';
        newOrder.orderReleasedAt = '';
        newOrder.orderTotlaAmaunt = this.orderAmount;
        newOrder.orderItemsArray = [...this.basketArray]
        newOrder.orderPaidBy = this.paymentMethodVar

        this.orderArray.push(newOrder)

        this.basketArrayCleaner()
        this.copyMenuArray()

    }




    // ====================================================================
    // Order operations end




    // пока не используем
    // =====================================================================================
    addMenuItem(menuItem) {
        if (menuItem.text.length > 3) {
            this.menuArray.push(menuItem)
        } else if (menuItem.text.length < 3) {
            return
        }

        console.log(this.menuArray)

    }

    removeMenuItem(id) {
        this.menuArray = this.menuArray.filter(menuItem => menuItem.id !== id)
        console.log('this.menuArray удаляем из незаконченных дел', this.menuArray)
    }


    changeTextFn(id, incomeText) {

        this.menuArray = this.menuArray.map(menuItem => menuItem.id === id ? { ...menuItem, text: (incomeText.length >= 3 ? (menuItem.text = incomeText) : menuItem.text) } : menuItem)
        // с ограничением на минимаальное кол-во символов = 3
    }

    // пока не используем
    // =====================================================================================


}

/* eslint import/no-anonymous-default-export: [2, {"allowNew": true}] */
export default new mainStore()