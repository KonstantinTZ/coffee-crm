import React from 'react'
import './KitchenPage.css'
import { OrderRow } from '../OrderRow/OrderRow'
import { observer } from 'mobx-react-lite'

import { orderStore } from '../../store/orderStore'
import { NavLink } from 'react-router-dom'


export const KitchenPage = observer(() => {

  return (
    <>
      {orderStore.kitchenOrders.length ?
        <div className='container-xxl pt-3 pb-3'>
          <div className="table-head row text-bg-light p-3 d-none d-lg-flex">
            <div className="col-1">
              <b>Номер</b>
            </div>
            <div className="col-10">
              <b>Позиции</b>
            </div>
            <div className="col-1">
              <b>Действие</b>
            </div>
          </div>
          {
            orderStore.kitchenOrders.map((o) => (
              <OrderRow
                btnMode={'kitchen'}
                key={o.id}
                orderNumber={o.orderNumber}
                orderItemsArray={o.items}
                orderId={o.id}
                prepairedMenuItems={o.prepairedMenuItems} />
            ))
          }
          {/* <OrderRow btnName={'Готов'}/>
      <OrderRow btnName={'Готов'}/>
      <OrderRow btnName={'Готов'}/> */}
        </div>
        :
        <div className='container-xxl pt-3 pb-3'>
          <h2 className='text-secondary'>
            Нет ни одного заказа
          </h2>
          <p className="text-secondary"> 
            Здесь появятся заказы, подтвержденные оператором на странице <NavLink className="link text-primary" to="/basket" title='Перейти на страницу Заказ'>"Заказ"</NavLink>
          </p>
        </div>
      }
    </>

  )
})
