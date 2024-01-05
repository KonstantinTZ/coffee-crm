import React from 'react';
import './OrderItem.css';
// import mainStore from '../../store/mainStore';
import { observer } from 'mobx-react-lite';
import mainStore from '../../store/mainStore';



export const OrderItem = observer(({prepaired, name, volume, quantity, menuItemid, orderId,btnMode}) => {
  

  function handlePrepairedClick () {
    if (btnMode === 'kitchen') mainStore.setOrderItemSetPrepaired(orderId, menuItemid)
    
  }

  return (

    <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
      <div className={`card h-100 ${prepaired ? 'card-success' : ''}`} 
      onClick={() => {handlePrepairedClick()}}
      >
        <div className="card-body">
          <h5 className="card-title text-start">{name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary text-start">Объем: {volume} мл.</h6>
          <h6 className="card-subtitle mb-2 text-body-secondary text-start">Количество: <b className='text-danger'>{quantity}</b> шт.</h6>
        </div>
      </div>
    </div>
  );
})
