import React from 'react'
import './OrderBoardPage.css'
import { InProcessBoard } from './InProcessBoard'
import { PrepairedBoard } from './PrepairedBoard'
import { Clock } from '../Clock'
export function OrderBoardPage() {
  return (
    <div className="vh-100 w-auto overflow-hidden">
      <div className="row justify-content-end">
        <div class="col-auto pe-0">
          <Clock />
        </div>
      </div>
      <div className="row">
        <InProcessBoard />
        <PrepairedBoard />
      </div>
     </div>
  )
}
