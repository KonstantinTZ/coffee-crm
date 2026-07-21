import {React, useEffect} from 'react'
import './PrepairedBoard.css';
import { OrderNumber } from '../OrderNumber/OrderNumber';
import { observer } from 'mobx-react-lite';

import authStore from '../../../store/authStore'
import { orderStore } from '../../../store/orderStore'


export const PrepairedBoard = observer(() => {
  
  return (
    <div className="col-6 prepaired-container">
      <h1 className='display-4 text-success mb-5'>Готов</h1>
      <div className="row prepaired-numbers-box">

      {
          orderStore.releaseOrders.map((item) => (
            <OrderNumber orderNumber={item.orderNumber} bootstrapColorClass={'success'} key={item.id}/>
          ))
        }
        
      {/* <OrderNumber orderNumber={"V15"} bootstrapColorClass={'success'}/> */}
      


      </div>
    </div>
  );
})
