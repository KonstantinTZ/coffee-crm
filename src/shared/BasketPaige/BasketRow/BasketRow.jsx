import React from 'react';
import './BasketRow.css';
import { observer } from 'mobx-react-lite';
import mainStore from '../../../store/mainStore';


export const BasketRow = observer(({rowNumber, positionName, positionQuantity, positionSumm, id, mode, orderId}) => {

  function increseBtnHandler (id) {
    if (mode === 'basket') {
      mainStore.changeQuantityFn(id, true);
      mainStore.addToBasketFn(id)
    }
  }

  function decreseBtnHandler (orderId, id) {
    if (mode === 'basket') {
    mainStore.changeQuantityFn(id, false);
    mainStore.addToBasketFn(id)
    } else if (mode === 'history') {
      mainStore.changeHistoryQuantityFn(orderId, id)
    }
  }

  return (
    <tr className='align-middle'>
      <th scope="row">{rowNumber}</th>
      <td>{positionName}</td>
      <td className='d-flex justify-content-center'>

      <div className="basket-counter-container d-flex align-items-center">
              <button className="btn btn-primary counter-btn-decrease" onClick={()=>decreseBtnHandler (orderId, id)} > - </button>
              <span className="counter-display"><b>{positionQuantity}</b>&nbsp;шт.</span>
              <button className="btn btn-primary counter-btn-increase" onClick={()=>increseBtnHandler(id)} disabled={mode === 'history'}> + </button>
            </div>




        {/* {positionQuantity} шт. */}
        </td>
      <td>{positionSumm}&nbsp;у.е.</td>
    </tr>
  );
})
