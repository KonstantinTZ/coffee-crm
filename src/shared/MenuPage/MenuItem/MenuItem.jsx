import React from 'react';
import './MenuItem.css';
import { observer } from "mobx-react-lite"
import  mainStore  from '../../../store/mainStore';


export const MenuItem = observer(({id, imgPath, productName, sellPrice, currency, volume, measure, quantity})=> {

  function increseBtnHandler (id) {
    mainStore.changeQuantityFn(id, true);
    mainStore.addToBasketFn(id)

  }

  function decreseBtnHandler (id) {
    mainStore.changeQuantityFn(id, false);
    mainStore.addToBasketFn(id)
  }



  return (

    <div className="col-xl-3 col-lg-4 col-md-6 col-12  mb-3">
      <div className={`card h-100 ${quantity !==0 ? 'card-picked' : ''}`} >
        <img 
        src={imgPath ? require(`../../../../src/img/${imgPath}.png`) : require(`../../../../src/img/no-image-plug.png`)} 
        className="card-img-top" 
        alt="изображение продукта" 
        />
        <div className="card-body ">
          <h5 className="card-title text-start">{productName}</h5>
          <p className="card-text text-start text-secondary mb-1">Объем: {volume} {measure}</p>
          <p className="card-text text-start ">Цена: <b>{sellPrice}</b> {currency}</p>

        </div>
          <div className="d-flex justify-content-center card-footer">
            <div className="counter-container d-flex align-items-center">
              <button className="btn btn-primary counter-btn-decrease" onClick={()=>decreseBtnHandler (id)}> - </button>
              <span className="counter-display"><b>{quantity}</b></span>
              <button className="btn btn-primary counter-btn-increase" onClick={()=>increseBtnHandler(id)}> + </button>
            </div>
          </div>
      </div>
    </div>





  );
})
