import React, { useState } from 'react';
import './MenuItem.css';

import img from '../../../../src/img/menu-item-coffee.png'

export function MenuItem() {

  const [count, setCount] = useState(1);

  // function countUpHandler (count) {
  //   if (count <= 10) {
  //     setCount(count + 1)
  //   } else {
  //     setCount(10)
  //   }
  // }

  // function countDownHandler (count) {
  //   if (count >= 1){
  //     setCount(count + 1)
  //   } else {
  //     setCount(1)
  //   }
  // }

  return (

    <div className="col-xl-3 col-lg-4 col-md-6 mb-3">
      <div className="card" >
        <img src={img} className="card-img-top" alt="продукт" />
        <div className="card-body ">
          <h5 className="card-title text-start">Кофе Американо</h5>
          <p className="card-text text-start">Стоимость: {1000 * count} др.</p>

          <div className="d-flex justify-content-between">
            <div className="counter-container d-flex align-items-center">
              <button className="btn btn-primary counter-btn-decrease" onClick={count >= 1 ? () => setCount(count - 1): setCount(1)}> - </button>
              <span className="counter-display">{count}</span>
              <button className="btn btn-primary counter-btn-increase" onClick={count <= 10 ? () => setCount(count + 1): setCount(10)}> + </button>
            </div>
            <button className="btn btn-success">Добавить</button >
          </div>
        </div>
      </div>
    </div>





  );
}
