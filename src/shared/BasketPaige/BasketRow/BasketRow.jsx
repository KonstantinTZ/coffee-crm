import React from 'react';
import './BasketRow.css';

export function BasketRow({rowNumber, positionName, positionQuantity, positionSumm}) {
  return (
    <tr>
      <th scope="row">{rowNumber}</th>
      <td>{positionName}</td>
      <td>{positionQuantity} шт.</td>
      <td>{positionSumm} др.</td>
    </tr>
  );
}
