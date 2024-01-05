import React from 'react';
import './OrderRow.css';
import { OrderItem } from '../../shared/OrderItem'
import mainStore from '../../store/mainStore';

export function OrderRow({btnMode, orderNumber, orderItemsArray, orderId, prepairedMenuItems}) {

  function pushToReleaseArrayHandler (orderId) {
    mainStore.addToReleaseOrderArray(orderId)
  }

  function pushToHistoryArrayHandler (orderId) {
    mainStore.addToHistoryArray(orderId)
  }
  return (
    <div className="row text-bg-light p-3 border-bottom">
      <div className="col-1 align-self-center">
        <h5>
          {orderNumber}
        </h5>
      </div>
      <div className="col-10">
        <div className="row">
          { orderItemsArray.map((item) => (
            <OrderItem 
            name={item.productName} 
            volume={item.volume} 
            quantity={item.quantity} 
            prepaired={item.prepaired} 
            key={item.id} 
            menuItemid = {item.id}
            orderId={orderId}
            btnMode={btnMode}
            />
          ))

          }
        {/* <OrderItem prepaired={false} name={'Кофе Эспрессо'} volume={50} quantity={3}/>
        <OrderItem prepaired={false} name={'Кофе Глиссе'} volume={100} quantity={1}/>
        <OrderItem prepaired={false} name={'Шоколад Snickers'} volume={1} quantity={1}/>
        <OrderItem prepaired={false} name={'Кофе Эспрессо'} volume={50} quantity={3}/>
        <OrderItem prepaired={false} name={'Кофе Глиссе'} volume={100} quantity={1}/>
        <OrderItem prepaired={false} name={'Шоколад Snickers'} volume={1} quantity={1}/> */}
 
        </div>
      </div>
      <div className="col-1 align-self-center justifu-self-center">
        {
          btnMode === 'kitchen' ?
        <button 
        className={`btn btn-danger`}
        disabled = {orderItemsArray.length !== prepairedMenuItems}
        onClick={() => {pushToReleaseArrayHandler(orderId)}}
        >
          Готов
        </button>
        :
        <button className={`btn btn-success`}
        onClick={() => {pushToHistoryArrayHandler(orderId)}}>
          Выдан
        </button>
        }
      </div>
    </div>
  );
}
