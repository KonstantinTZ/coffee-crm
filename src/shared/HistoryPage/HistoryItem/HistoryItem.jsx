import React from 'react';
import './HistoryItem.css';


export function HistoryItem({itemName, itemQuantity}) {
  return (
    <button type="button" className="btn btn-secondary  col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6 ms-1 mb-1" disabled={true}>{itemName} ... {itemQuantity} шт.</button>
  );
}
