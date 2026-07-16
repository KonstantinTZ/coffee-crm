import {React} from 'react';
import './MenuItem.css';
import { observer } from "mobx-react-lite"
import { basketStore } from '../../../store/basketStore';


export const MenuItem = observer(({id, imgPath, productName, sellPrice, currency, volume, measure})=> {

  // не используем useState, т.к. контролируем через mobx
  const quantity = basketStore.getItemQuantity(id);

  function increseBtnHandler () {
    if (quantity < 10) {
      basketStore.addToBasket(id, quantity + 1);
    }
  }

  function decreseBtnHandler () {
    if (quantity > 0) {
      basketStore.updateQuantity(id, quantity - 1); 
    }  
  }
  
  return (

    <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12  mb-3">
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
              <button className="btn btn-primary counter-btn-decrease" onClick={decreseBtnHandler}> - </button>
              <span className="counter-display"><b>{quantity}&nbsp;шт.</b></span>
              <button className="btn btn-primary counter-btn-increase" onClick={increseBtnHandler}> + </button>
            </div>
          </div>
      </div>
    </div>
  );
})
