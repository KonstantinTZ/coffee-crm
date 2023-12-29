import React, { useState } from 'react';
import './MenuItem.css';

export function MenuItem({imgPath, productName, sellPrice, currency, volume, measure}) {

  const [count, setCount] = useState(1);

  return (

    <div className="col-xl-3 col-lg-4 col-md-6 col-12  mb-3">
      <div className="card h-100" >
        <img 
        src={imgPath ? require(`../../../../src/img/${imgPath}.png`) : require(`../../../../src/img/no-image-plug.png`)} 
        className="card-img-top" 
        alt="изображение продукта" 
        />
        <div className="card-body ">
          <h5 className="card-title text-start">{productName}</h5>
          <p className="card-text text-start text-secondary mb-1">Объем: {volume} {measure}</p>
          <p className="card-text text-start ">Стоимость: <b>{sellPrice}</b> {currency}</p>

        </div>
          <div className="d-flex justify-content-between card-footer">
            <div className="counter-container d-flex align-items-center">
              <button className="btn btn-primary counter-btn-decrease" onClick={count >= 1 ? () => setCount(count - 1): setCount(1)}> - </button>
              <span className="counter-display">{count}</span>
              <button className="btn btn-primary counter-btn-increase" onClick={count <= 10 ? () => setCount(count + 1): setCount(10)}> + </button>
            </div>
            <button className="btn btn-success">Добавить</button>
          </div>
      </div>
    </div>





  );
}
