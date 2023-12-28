import React from 'react';
import './PrepairedBoard.css';
import { OrderNumber } from '../OrderNumber/OrderNumber';

export function PrepairedBoard() {
  return (
    <div className="col-6 prepaired-container">
      <h1 className='display-4 text-success mb-5'>Готов</h1>
      <div className="row prepaired-numbers-box">
      <OrderNumber orderNumber={"V15"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"N43"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"N44"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"R43"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"Z44"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"V15"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"N43"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"N44"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"R43"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"R43"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"Z44"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"V15"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"N43"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"N44"} bootstrapColorClass={'success'}/>
      <OrderNumber orderNumber={"R43"} bootstrapColorClass={'success'}/>


      </div>
    </div>
  );
}
