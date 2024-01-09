import React from 'react';
import './HistoryItem.css';


export function HistoryItem({itemName, itemQuantity}) {
  return (
    <button type="button" className="btn btn-secondary col-3 ms-1 mb-1" disabled={true}>{itemName} ... {itemQuantity} шт.</button>
  );
}
