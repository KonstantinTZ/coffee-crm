import React, { } from 'react';
import './MenuPage.css';
import { MenuItem } from '../../../src/shared/MenuPage/MenuItem'
import { menuPresetArray } from '../../store/menuPreset'

export function MenuPage() {
  


  return (
    <div className="row row-cols-auto">

      {menuPresetArray.map((item) => (
        
        <MenuItem 
        imgPath={item.imgPath} 
        productName={item.productName} 
        sellPrice={item.sellPrice} 
        key={item.id}  
        currency={item.currency} 
        volume={item.volume} 
        measure={item.measure}
        />
        
      ))}

    </div>

  );
}
