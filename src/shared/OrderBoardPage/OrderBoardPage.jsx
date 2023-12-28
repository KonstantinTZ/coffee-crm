import React from 'react';
import './OrderBoardPage.css';
import { InProcessBoard } from './InProcessBoard'
import { PrepairedBoard } from './PrepairedBoard'
export function OrderBoardPage() {
  return (
    <div className="container">
      <div className="row">
        <InProcessBoard />
        <PrepairedBoard />
      </div>
    </div>
  );
}
