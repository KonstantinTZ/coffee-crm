import React from 'react';
import './HistoryPage.css';
import { HistoryRow } from './HistoryRow/HistoryRow';
import mainStore from '../../store/mainStore';
import { observer } from 'mobx-react-lite';


export const HistoryPage = observer(() =>{
  return (
    <div className="container">

      <div className="row mb-5">
        <table className="table table-striped align-middle">
          <thead className="table-warning">
            <tr>
              <th scope="col">Время</th>
              <th scope="col">Номер</th>
              <th scope="col">Сумма</th>
              <th scope="col">Поизиции</th>
              <th scope="col">Действие</th>
            </tr>
          </thead>
          <tbody>
            {
              mainStore.historyArray.map((item)=>(
                <HistoryRow 
                orderTime={new Date (item.orderCreatedAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))} 
                orderNumber={item.orderNumber} 
                orderSumm={item.orderTotlaAmaunt}
                orderArray = {item.orderItemsArray}
                key={item.orderId}
                orderId ={item.orderId}
                />
              ))
            }
            


          </tbody>
        </table>
      </div>
    </div>
  );
})
