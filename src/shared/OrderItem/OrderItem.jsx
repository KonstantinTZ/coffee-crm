import React, { useState } from 'react';
import './OrderItem.css';

export function OrderItem({prepaired, name, volume, quantity}) {
  const [isPrepaired, setPrepaired] = useState(prepaired)

  return (

    <div className="col-lg-3 col-md-4 col-sm-6 mb-3">
      <div className={`card ${isPrepaired ? 'card-success' : ''}`} onClick={() => {setPrepaired(true)}}>
        <div className="card-body">
          <h5 className="card-title text-start">{name}</h5>
          <h6 className="card-subtitle mb-2 text-body-secondary text-start">Объем: {volume} мл.</h6>
          <h6 className="card-subtitle mb-2 text-body-secondary text-start">Количество: {quantity} шт.</h6>
        </div>
      </div>
    </div>
  );
}
