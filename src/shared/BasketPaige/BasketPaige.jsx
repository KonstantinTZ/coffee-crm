import React from 'react';
import './BasketPaige.css';
import { BasketRow } from './BasketRow/BasketRow';
import { observer } from "mobx-react-lite"
import mainStore from '../../store/mainStore';


export const BasketPaige = observer(() =>{
  return (
    <>
    {mainStore.basketArray.length ? 

    <div className="container">
      <div className="row mb-4">
        <h1 className='text-danger '>
          Проверьте заказ
        </h1>
      </div>
      <div className="row mb-5">
        <table className="table table-striped">
          <thead className="table-warning">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Позиция</th>
              <th scope="col">Колличество</th>
              <th scope="col">Сумма</th>
            </tr>
          </thead>
          <tbody>
            
          {mainStore.basketArray.map((item) => ( 
            <BasketRow 
            rowNumber={mainStore.basketArray.indexOf(item) + 1}  
            positionName={item.productName}  
            positionQuantity={item.quantity} 
            positionSumm={item.sellPrice * item.quantity}
            key={item.id}
            />

          ))}

            {/* <BasketRow rowNumber={1}  positionName={"Кофе капучино S"}  positionQuantity={3} positionSumm={2000}/>
            <BasketRow rowNumber={2}  positionName={"Шоколад MARS"}  positionQuantity={1} positionSumm={1000}/> */}
            
            <tr>
              <th scope="row">Итого</th>
              <td></td>
              <td></td>
              <th>{mainStore.orderAmount} </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="row mb-3">
        <div className="btn-group" role="group" aria-label="Базовая группа переключателей радио">
          <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" />
          <label className="btn btn-outline-primary pay-type-button" for="btnradio1">Оплата наличными</label>

          <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
          <label className="btn btn-outline-primary pay-type-button" for="btnradio2">Оплата катрой</label>

          <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autocomplete="off" />
          <label className="btn btn-outline-primary pay-type-button" for="btnradio3">Оплата переводом</label>
        </div>
      </div>
      <div className="row mb-5">
        <h2 className="text-danger">
          К оплате: {mainStore.orderAmount}
        </h2>
      </div>
      <div className="row ">
        <div className="btn-group">
          <button type="button" class="btn btn-warning p-4" onClick={()=> {console.log('click')}}>Оплата завершена</button>
        </div>
      </div>
    </div>
    : 
    <div className="container">
      <h2 className='text-secondary'>
        Добавьте позиции из меню
      </h2>
    </div>
    }
    </>
  );
})
