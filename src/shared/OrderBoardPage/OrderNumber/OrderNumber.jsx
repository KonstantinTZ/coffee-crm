import React from 'react';
import 'animate.css';
import './OrderNumber.css';

export function OrderNumber({orderNumber, bootstrapColorClass}) {
  return (
    <h1 className={`display-2 col-3 text-${bootstrapColorClass} animate__animated animate__flash animate__slower` }>
          <b>{orderNumber}</b>
        </h1>
  );
}
