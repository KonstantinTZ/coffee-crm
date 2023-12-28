import React from 'react';
import './OrderRow.css';
import { OrderItem } from '../../shared/OrderItem'

export function OrderRow({btnName}) {
  return (
    <div className="row text-bg-light p-3 border-bottom">
      <div className="col-1 align-self-center">
        <h5>
          N95
        </h5>
      </div>
      <div className="col-10">
        <div className="row">
        <OrderItem prepaired={false} name={'Кофе Эспрессо'} volume={50} quantity={3}/>
        <OrderItem prepaired={false} name={'Кофе Глиссе'} volume={100} quantity={1}/>
        <OrderItem prepaired={false} name={'Шоколад Snickers'} volume={1} quantity={1}/>
        <OrderItem prepaired={false} name={'Кофе Эспрессо'} volume={50} quantity={3}/>
        <OrderItem prepaired={false} name={'Кофе Глиссе'} volume={100} quantity={1}/>
        <OrderItem prepaired={false} name={'Шоколад Snickers'} volume={1} quantity={1}/>
 
        </div>
      </div>
      <div className="col-1 align-self-center justifu-self-center">
        <button className={`btn btn-${btnName==='Готов'? "danger" : 'success' }`}>
          {btnName}
        </button>
      </div>
    </div>
  );
}
