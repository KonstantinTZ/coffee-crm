import React from 'react';
import './OrderRow.css';
import { OrderItem } from '../../shared/OrderItem'

import mainStore from '../../store/mainStore';
import useSound from 'use-sound';
import ringSfx from '../../sound/ringSfx.mp3';

export function OrderRow({btnMode, orderNumber, orderItemsArray, orderId, prepairedMenuItems}) {


  const [play] = useSound(ringSfx)

  function pushToReleaseArrayHandler (orderId) {
    mainStore.addToReleaseOrderArray(orderId)
    play()
  }

  function pushToHistoryArrayHandler (orderId) {
    mainStore.addToHistoryArray(orderId)
  }
  return (
  <>
    <div className="row text-bg-light p-3 border-bottom order-row table-row">
      <div className="col-1 align-self-center first-table-column sticky-top sticky-hidden d-lg-none">
        <h5>
          {orderNumber}
        </h5>
      </div>
      <div className="col-1 align-self-center first-table-column">
        <h5 >
          {orderNumber}
        </h5>
      </div>
      <div className="col-10 second-table-column">
        {
          orderItemsArray.length ? 
          <div className="row">
          { orderItemsArray.map((item) => (
            <OrderItem 
            name={item.productName} 
            volume={item.volume} 
            quantity={item.quantity} 
            prepaired={item.prepaired} 
            key={item.id} 
            menuItemid = {item.id}
            measure={item.measure}
            orderId={orderId}
            btnMode={btnMode}
            />
          ))

          }
        </div> :

        <div className="row">
          <span className='text-danger mb-3'>Заказ был полностью отменён</span>
        </div>

        }
        
      </div>
      <div className="col-1 align-self-center justifu-self-center threed-table-column">
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
  
      </>
  );
}
