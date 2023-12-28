import React from 'react';
import './ReleaseOrderPage.css';
import { OrderRow } from '../OrderRow/OrderRow';

export function ReleaseOrderPage() {
  return (
    <div className='container'>
    <div className="table-head row text-bg-light p-3">
      <div className="col-1">
        № Заказа
      </div>
      <div className="col-10">
        Позиции заказа
      </div>
      <div className="col-1">
        Действие
      </div>
    </div>
    <OrderRow btnName={'Выдан'}/>
    <OrderRow btnName={'Выдан'}/>
    <OrderRow btnName={'Выдан'}/>
  </div>
  );
}
