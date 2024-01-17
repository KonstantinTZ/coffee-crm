import React from 'react';
import './MenuPage.css';
import { MenuItem } from '../../../src/shared/MenuPage/MenuItem'
import { observer } from "mobx-react-lite"
import mainStore from '../../store/mainStore';
import { useState } from 'react';




export const MenuPage = observer(() => {
  const [filter, setFilter] = useState ('drinks')




  return (
    <>
      <div className="container row mb-3">

        <ul className="nav nav-tabs flex-nowrap">
          <li className="nav-item">
            <button className={`nav-link ${filter === 'drinks' ? 'active' : ''}`} 

            onClick={()=>(setFilter('drinks'))}>
              Напитки</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${filter === 'pies' ? 'active' : ''}`}  

            onClick={()=>(setFilter('pies'))}>
              Пирожки</button>
          </li>
          <li className="nav-item">
            <button className={`nav-link ${filter === 'salads' ? 'active' : ''}`}   
  
             onClick={()=>(setFilter('salads'))}
            >Салаты</button>
          </li>
        </ul>

      </div>

      <div className="row row-cols-auto">

        {mainStore.menuArray.filter((item)=>(item.category).includes(filter)).map((item) => (

          <MenuItem
            id={item.id}
            imgPath={item.imgPath}
            productName={item.productName}
            sellPrice={item.sellPrice}
            key={item.id}
            currency={item.currency}
            volume={item.volume}
            measure={item.measure}
            quantity={item.quantity}
          />

        ))}

      </div>
    </>

  );
})

