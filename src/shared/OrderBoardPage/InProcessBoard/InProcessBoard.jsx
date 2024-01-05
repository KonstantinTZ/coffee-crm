import React from 'react';
import './InProcessBoard.css';
import { OrderNumber } from '../OrderNumber/OrderNumber';
import mainStore from '../../../store/mainStore';

export function InProcessBoard() {
  return (
    <div className="col-6 in-procsess-container">
      <h1 className='display-4 text-danger mb-5'>В процессе</h1>
      <div className="row">
        {
          mainStore.orderArray.map((item) => (
            <OrderNumber orderNumber={item.orderNumber} bootstrapColorClass={'danger'} key={item.orderId}/>
          ))
        }
      {/* <OrderNumber orderNumber={"S12"} bootstrapColorClass={'danger'}/> */}


      </div>
    </div>
  );
}
