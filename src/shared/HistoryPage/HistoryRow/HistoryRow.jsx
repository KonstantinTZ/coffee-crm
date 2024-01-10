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
        <th>{orderArray.length ? `${orderSumm} у.е.` : '-'}</th>
        <td>
          {orderArray.length ?
            <div className="row">
              {orderArray.map((item) => (

                <HistoryItem itemName={item.productName} itemQuantity={item.quantity} key={item.id} />

              ))

              }
            </div> :
            <div className="row">
              <span className='text-danger'>Заказ был полностью отменён</span>
            </div>
          }
        </td>
        <td>
          
          <button
            className='btn btn-primary'
            onClick={() => { changeBtnHandler() }}
            disabled = {!orderArray.length}
          >
            Изменить
          </button>
        </td>
      </tr>
      {isModalOpend &&
        <HistoryModal
          setIsModalOpend={setIsModalOpend}
          orderNumber={orderNumber}
          orderArray={orderArray}
          orderSumm={orderSumm}
          orderId={orderId}
        />}
    </>
  );
}
