import React, { useEffect } from 'react'
import './BasketPaige.css'
import { BasketRow } from './BasketRow/BasketRow'
import { observer } from "mobx-react-lite"
import { basketStore } from '../../store/basketStore'
import { NavLink } from 'react-router-dom'


export const BasketPaige = observer(() => {

  function asseptBtnHandler() {
    basketStore.confirmOrder()
  }

  useEffect(() => {
    return () => { basketStore.updateOrderByPaymentMethod('') }
  }, [])

  return (
    <>
      {basketStore.basketArray.length ?
        <div className="container-xxl pt-3 pb-3">
          <div className="row mb-4">
            <h1 className='text-danger '>
              Проверьте заказ
            </h1>
          </div>
          <div className="row mb-5">
            <table className="table table-striped align-middle table-sm" >
              <thead className="table-warning">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Позиция</th>
                  <th scope="col">Колличество</th>
                  <th scope="col">Сумма</th>
                </tr>
              </thead>
              <tbody>

                {basketStore.basketArray.map((item) => (
                  <BasketRow
                    rowNumber={basketStore.basketArray.indexOf(item) + 1}
                    positionName={item.productName}
                    positionQuantity={item.quantity}
                    positionSumm={item.sellPrice * item.quantity}
                    positionCurrency={item.currency}
                    key={item.menuItemId}
                    id={item.menuItemId}
                  />

                ))}

                {/* <BasketRow rowNumber={1}  positionName={"Кофе капучино S"}  positionQuantity={3} positionSumm={2000}/>
            <BasketRow rowNumber={2}  positionName={"Шоколад MARS"}  positionQuantity={1} positionSumm={1000}/> */}

                <tr>
                  <th scope="row">Итого</th>
                  <td></td>
                  <td></td>
                  {/* выбираем валюту первого элемента массива basketArray */}
                  <th>{basketStore.orderAmount} {basketStore.basketArray[0].currency}</th>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="row mb-3">
            <div className="btn-group" role="group" aria-label="Базовая группа переключателей радио">
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                autoComplete="off"
                onClick={() => { basketStore.updateOrderByPaymentMethod('cash') }}
              />
              <label className="btn btn-outline-primary pay-type-button" htmlFor="btnradio1">Оплата наличными</label>

              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio2"
                autoComplete="off"
                onClick={() => { basketStore.updateOrderByPaymentMethod('by card') }}
              />
              <label className="btn btn-outline-primary pay-type-button" htmlFor="btnradio2">Оплата картой</label>

              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio3"
                autoComplete="off"
                onClick={() => { basketStore.updateOrderByPaymentMethod('transfer') }}
              />
              <label className="btn btn-outline-primary pay-type-button" htmlFor="btnradio3">Оплата переводом</label>

              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio4"
                autoComplete="off"
                onClick={() => { basketStore.updateOrderByPaymentMethod('SBP') }}
              />
              <label className="btn btn-outline-primary pay-type-button" htmlFor="btnradio4">СБП</label>

            </div>
          </div>
          <div className="row mb-5">
            {/* выбираем валюту первого элемента массива basketArray */}
            <h2 className="text-danger">
              К оплате: {basketStore.orderAmount} {basketStore.basketArray[0].currency}
            </h2>
          </div>
          <div className="row ">
            <div className="btn-group">
              <button
                type="button"
                className="btn btn-warning p-4"
                onClick={() => { asseptBtnHandler() }}
                disabled={!basketStore.paymentMethodVar}
              >Завершить оплату</button>
            </div>
          </div>
        </div>
        :
        <div className="container-xxl pt-3 pb-3">
          {!basketStore.orderArray.length ?
            <>
              <h2 className='text-secondary'>
                Добавьте позиции из меню
              </h2>
              <p className="text-secondary">
                Добавьте позиции на странице <NavLink className="link text-primary" to="/menu" title='Перейти на страницу меню'>"Меню"</NavLink>
              </p>
            </>
            :
            <h1 className='text-danger pt-5'>
              Сообщите номер заказа клиенту : {basketStore.orderArray[basketStore.orderArray.length - 1].orderNumber}
            </h1>
            // вот это переделать на попап !!!! todo
          }
        </div>
      }
    </>
  )
})
