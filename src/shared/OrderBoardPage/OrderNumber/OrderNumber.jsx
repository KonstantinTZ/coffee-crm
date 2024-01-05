import React from 'react';
import './OrderNumber.css';

export function OrderNumber({orderNumber, bootstrapColorClass}) {
  return (
    <h1 className={`display-2 col-3 text-${bootstrapColorClass}`}>
          <b>{orderNumber}</b>
        </h1>
  );
}
