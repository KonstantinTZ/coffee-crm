import React from 'react';
import './InProcessBoard.css';
import { OrderNumber } from '../OrderNumber/OrderNumber';

export function InProcessBoard() {
  return (
    <div className="col-6 in-procsess-container">
      <h1 className='display-4 text-danger mb-5'>В процессе</h1>
      <div className="row">
      <OrderNumber orderNumber={"S12"} bootstrapColorClass={'danger'}/>


      </div>
    </div>
  );
}
