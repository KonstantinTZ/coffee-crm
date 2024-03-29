import React from 'react';
import './KitchenPage.css';
import { OrderRow } from '../OrderRow/OrderRow';
import { observer } from 'mobx-react-lite';
import mainStore from '../../store/mainStore';
// import { useEffect } from 'react'
// import {getJSON} from '../../utils/getJSON.js'


export const KitchenPage = observer(() => {
  return (
    <>
      {mainStore.orderArray.length ?
    <div className='container'>
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
        mainStore.orderArray.map((item) => (
          <OrderRow 
          btnMode={'kitchen'} 
          key={item.orderId} 
          orderNumber={item.orderNumber} 
          orderItemsArray={item.orderItemsArray} 
          orderId={item.orderId} 
          prepairedMenuItems={item.prepairedMenuItems}/>
        ))
      }
      {/* <OrderRow btnName={'Готов'}/>
      <OrderRow btnName={'Готов'}/>
      <OrderRow btnName={'Готов'}/> */}
    </div>
    :
    <h2 className='text-secondary'>
          Нет ни одного заказа
        </h2>
    }
    </>

  );
})
