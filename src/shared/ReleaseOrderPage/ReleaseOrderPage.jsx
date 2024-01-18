import React from 'react';
import './ReleaseOrderPage.css';
import { OrderRow } from '../OrderRow/OrderRow';
import mainStore from '../../store/mainStore';
import { observer } from 'mobx-react-lite';



export const ReleaseOrderPage = observer(() => {
  return (

    <>
      {mainStore.releaseOrderArray.length ?
        <div className='container'>
          <div className="row justify-content-end">
            <button className='btn btn-success col-6 col-lg-3 mb-3'
              onClick={() => (mainStore.addAllToHistoryArray())}
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
            mainStore.releaseOrderArray.map((item) => (
              <OrderRow
                btnMode={'release'}
                key={item.orderId}
                orderNumber={item.orderNumber}
                orderItemsArray={item.orderItemsArray}
                orderId={item.orderId} />
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
