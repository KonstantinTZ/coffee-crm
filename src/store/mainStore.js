import { makeAutoObservable } from 'mobx'
import { menuPresetArray } from './menuPreset'
import { v4 as uuidv4 } from 'uuid';
import { ticketGenerator } from '../utils/ticketGenerator'
import { makePersistable, hydrateStore, clearPersistedStore } from 'mobx-persist-store';


class mainStore {


  constructor() {
    makeAutoObservable(this, {}, { deep: true })
    // ниже из библиотеки mobx-persist-store
    makePersistable(this, 
      { name: 'mainStore', 
      properties: ['basketArray', 'orderArray', 'releaseOrderArray', 'historyArray'], 
      storage: window.localStorage 
    });
    //сохраняем в локал сторидж что бы а) при обновлении старницы данные не обнулялись
    //б) была возможность синхронизации вкладок без ВЕБ сокета.

  }

  hydrateStore() {
    hydrateStore(this);
    console.log('hydrateStore working');
  }
  // hydrateStore вызываем в main.jsx при обновлении локалстора
  // hydrateStore обновляет наш стор

  async clearStoredDate() {
    await clearPersistedStore(this);
  }
  // для очистки стора из локал сториджа


  // ====================================================================
  // Menu operations start

  menuArray = []



  copyMenuArray() {
    this.menuArray = JSON.parse(JSON.stringify(menuPresetArray))
    this.menuArray.forEach(function (item) {
      item.quantity = 0
      item.prepaired = false
      item.id = uuidv4();
      // во избежании ошибки дублирования id при ручном вводе.
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
    this.paymentMethodVar = ''
  }


  // ====================================================================
  // basket operations end

  // ====================================================================
  // Order operations start

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
    newOrder.orderPaidBy = this.paymentMethodVar
    newOrder.orderItemsArray = [...this.basketArray]
    newOrder.prepairedMenuItems = 0

    this.orderArray.push(newOrder)



    this.basketArrayCleaner()
    this.copyMenuArray()

  }

  setOrderItemSetPrepaired(orderItemId, menuItemid) {
    // не нравится эта функция, но работает

    // при клике фильтруем массив с меню и выделяем объект с заказом

    const pickedItem = this.orderArray.find(function (orderItem) {
      return orderItem.orderId === orderItemId;
    });

    pickedItem.orderItemsArray = pickedItem.orderItemsArray.map(menuItem => menuItem.id === menuItemid ? { ...menuItem, prepaired: true } : menuItem)

    let counter = 0

    for (const item of pickedItem.orderItemsArray) {
      if (item.prepaired === true) {
        counter++
      }

    }

    pickedItem.prepairedMenuItems = counter

  }


  // ====================================================================
  // Order operations end

  // ====================================================================
  // ReleaseOrder operations start

  releaseOrderArray = []

  addToReleaseOrderArray(orderItemId) {
    const pickedItem = this.orderArray.find(function (orderItem) {
      return orderItem.orderId === orderItemId;
    });

    pickedItem.orderPrepairedAt = new Date()

    this.releaseOrderArray.push(pickedItem)


    this.orderArray = this.orderArray.filter(orderItem => orderItem.orderId !== orderItemId)



  }


  // ====================================================================
  // ReleaseOrder operations end




  // ====================================================================
  // History operations start

  historyArray = []
  
  get historyArrayCheker () {
    
      this.historyArray.forEach((item) => item.orderCreatedAt = new Date(item.orderCreatedAt))
    
    return this.historyArray
  }


  copyHistoryArray = []
  // своеобрвзный карман

  copyHistoryArrayFn() {
    this.copyHistoryArray = JSON.parse(JSON.stringify(this.historyArray))
  }

  cancelChangesHistoryArrayFn() {
    this.historyArray.splice(0, this.historyArray.length);
    this.historyArray = JSON.parse(JSON.stringify(this.copyHistoryArray))
    this.historyArray.forEach((item) => item.orderCreatedAt = new Date(item.orderCreatedAt))
    // иначе дата в типе строка и выходит ошибка
    this.copyHistoryArray.splice(0, this.copyHistoryArray.length);
  }

  addToHistoryArray(orderItemId) {
    const pickedItem = this.releaseOrderArray.find(function (orderItem) {
      return orderItem.orderId === orderItemId;
    });

    pickedItem.orderReleasedAt = new Date()
    pickedItem.orderTime = pickedItem.orderCreatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    delete pickedItem.prepairedMenuItems;
    this.historyArray.unshift(pickedItem);


    this.releaseOrderArray = this.releaseOrderArray.filter(orderItem => orderItem.orderId !== orderItemId);
  


  }


  changeHistoryQuantityFn(orderItemId, menuItemid) {
    // не нравится эта функция, но работает

    // при клике фильтруем массив с меню и выделяем объект с заказом

    const pickedItem = this.historyArray.find(function (orderItem) {
      return orderItem.orderId === orderItemId;
    });

    pickedItem.orderItemsArray = pickedItem.orderItemsArray.map(menuItem => menuItem.id === menuItemid ? { ...menuItem, quantity: (menuItem.quantity > 0 ? menuItem.quantity - 1 : menuItem.quantity) } : menuItem)
    for (let item of pickedItem.orderItemsArray) {
      if (item.quantity === 0) {
        pickedItem.orderItemsArray = pickedItem.orderItemsArray.filter(item => item.id !== menuItemid)
      }
    }


    // меняем общую сумму заказа
    pickedItem.orderItemsArray.forEach((item) => item.productAmount = item.quantity * item.sellPrice)

    pickedItem.orderTotlaAmaunt = pickedItem.orderItemsArray.reduce((summ, item) => summ = summ + item.productAmount, 0)


 




  }


  historyChangeCounter(orderItemId) {

    const pickedItem = this.historyArray.find(function (orderItem) {
      return orderItem.orderId === orderItemId;
    });

    let copyPickedItem = this.copyHistoryArray.find(function (orderItem) {
      return orderItem.orderId === orderItemId;
    });

    let delta = copyPickedItem.orderTotlaAmaunt - pickedItem.orderTotlaAmaunt

    return delta
  }




  // ====================================================================
  // History operations end




  // пока не используем
  // =====================================================================================
  addMenuItem(menuItem) {
    if (menuItem.text.length > 3) {
      this.menuArray.push(menuItem)
    } else if (menuItem.text.length < 3) {
      return
    }



  }

  removeMenuItem(id) {
    this.menuArray = this.menuArray.filter(menuItem => menuItem.id !== id)

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

