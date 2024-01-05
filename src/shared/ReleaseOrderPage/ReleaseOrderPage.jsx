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
          <div className="table-head row text-bg-light p-3">
            <div className="col-1">
              № Заказа
            </div>
            <div className="col-10">
              Позиции заказа
            </div>
            <div className="col-1">
              Действие
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
