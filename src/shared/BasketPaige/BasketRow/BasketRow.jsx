import React from 'react';
import './BasketRow.css';
import { observer } from 'mobx-react-lite';
import mainStore from '../../../store/mainStore';


export const BasketRow = observer(({rowNumber, positionName, positionQuantity, positionSumm, id}) => {

  function increseBtnHandler (id) {
    mainStore.changeQuantityFn(id, true);
    mainStore.addToBasketFn(id)
  }

  function decreseBtnHandler (id) {
    mainStore.changeQuantityFn(id, false);
    mainStore.addToBasketFn(id)
  }

  return (
    <tr>
      <th scope="row">{rowNumber}</th>
      <td>{positionName}</td>
      <td className='d-flex justify-content-center'>

      <div className="basket-counter-container d-flex align-items-center">
              <button className="btn btn-primary counter-btn-decrease" onClick={()=>decreseBtnHandler (id)} > - </button>
              <span className="counter-display"><b>{positionQuantity}</b> шт.</span>
              <button className="btn btn-primary counter-btn-increase" onClick={()=>increseBtnHandler(id)} > + </button>
            </div>




        {/* {positionQuantity} шт. */}
        </td>
      <td>{positionSumm} у.е.</td>
    </tr>
  );
})
