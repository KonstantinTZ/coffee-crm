import React, { useState } from 'react';
import './HistoryRow.css';
import { HistoryItem } from '../HistoryItem/HistoryItem';
import { HistoryModal } from '../HistoryModal/HistoryModal';
import mainStore from '../../../store/mainStore';


export function HistoryRow({ orderTime, orderNumber, orderSumm, orderArray, orderId }) {
  const [isModalOpend, setIsModalOpend] = useState(false)
  function changeBtnHandler() {
    setIsModalOpend(true);
    mainStore.copyHistoryArrayFn()
  }
  return (
    <>
      <tr>
        <th scope="row" >{orderTime}</th>
        <th>{orderNumber}</th>
        <th>{orderSumm}&nbsp;у.е.</th>
        <td>
          <div className="row">
            {orderArray.map((item) => (
              <HistoryItem itemName={item.productName} itemQuantity={item.quantity} key={item.id} />

            ))

            }
          </div>

        </td>
        <td>
          <button
            className='btn btn-primary'
            onClick={() => { changeBtnHandler() }}
          >
            Изменить
          </button>
        </td>
      </tr>
      {isModalOpend && 
      <HistoryModal 
      setIsModalOpend={setIsModalOpend}
      orderNumber = {orderNumber}
      orderArray = {orderArray}
      orderSumm = {orderSumm}
      orderId = {orderId}
      />}
    </>
  );
}
