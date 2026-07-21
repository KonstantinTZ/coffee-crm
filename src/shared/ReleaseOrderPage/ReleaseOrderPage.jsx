import {React, useEffect} from 'react';
import './ReleaseOrderPage.css';
import { OrderRow } from '../OrderRow/OrderRow';
import { observer } from 'mobx-react-lite';
import { orderStore } from '../../store/orderStore';
import authStore  from '../../store/authStore'



export const ReleaseOrderPage = observer(() => {

    function allToHistoryBtnHandler(){
      console.log('allToHistoryBtnHandler')
    }

  return (

    <>
      {orderStore.releaseOrders.length ?
        <div className='container'>
          <div className="row justify-content-end">
            <button className='btn btn-success col-6 col-lg-3 mb-3'
              onClick={allToHistoryBtnHandler}
            >
              Выдать все заказы
            </button>
          </div>
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
            orderStore.releaseOrders.map((o) => (
              <OrderRow
                btnMode={'release'}
                key={o.id}
                orderNumber={o.orderNumber}
                orderItemsArray={o.items}
                orderId={o.id} />
            ))
          }


          {/* <OrderRow btnName={'Выдан'}/>
    <OrderRow btnName={'Выдан'}/>
    <OrderRow btnName={'Выдан'}/> */}
        </div>
        :
        <h2 className='text-secondary'>
          Ни один заказ еще не готов
        </h2>
      }
    </>
  );
})
