import React, {useEffect} from 'react';
import './MenuPage.css';
import { MenuItem } from '../../../src/shared/MenuPage/MenuItem'
import { observer } from "mobx-react-lite"
import mainStore from '../../store/mainStore';



export const MenuPage = observer(() => {

  useEffect(() => {
    mainStore.copyMenuArray();

  }, [])


  return (
    <div className="row row-cols-auto">

      {mainStore.menuArray.map((item) => (
        
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

  );
})

