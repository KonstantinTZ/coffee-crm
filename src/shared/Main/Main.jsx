import React, { useEffect } from 'react';
import './Main.css';
import { Routes, Route } from 'react-router-dom';
import {MenuPage} from '../../shared/MenuPage'
import { OrderBoardPage } from '../OrderBoardPage/OrderBoardPage';
import { KitchenPage } from '../KitchenPage/KitchenPage';
import {ReleaseOrderPage} from '../ReleaseOrderPage'
import {BasketPaige} from '../BasketPaige'
import mainStore from '../../store/mainStore';

export function Main() {
  useEffect(() => {
    mainStore.copyMenuArray();
    
  }, [])
  return (
    <div className="main container pt-3 pb-3">
      
      <Routes>
        <Route path="*" element={<MenuPage />} />
        {/* path="*" - если ничего не задано или задано неправильно */}
        <Route path="kitchen" element={<KitchenPage />} />
        <Route path="release" element={<ReleaseOrderPage />} />
        <Route path="order-board" element={<OrderBoardPage/>} />
        <Route path="basket" element={<BasketPaige/>} />
      </Routes>
    
    </div>
  );
}
