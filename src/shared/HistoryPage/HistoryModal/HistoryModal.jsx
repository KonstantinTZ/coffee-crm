import React from 'react';
import ReactDOM from 'react-dom'
import './HistoryModal.css';
import { BasketRow } from '../../BasketPaige/BasketRow/BasketRow';
import { observer } from "mobx-react-lite"
import mainStore from '../../../store/mainStore';


export const HistoryModal = observer(({ setIsModalOpend, orderNumber, orderArray, orderSumm, orderId }) => {

  function cancelBtnHandle() {
    setIsModalOpend(false)
    mainStore.cancelChangesHistoryArrayFn()
  }

  return ReactDOM.createPortal((

    <div className="modal fade show" id="HistoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Внесение изменений в заказ № <b className='text-danger'>{orderNumber}</b></h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { cancelBtnHandle() }}></button>
          </div>
          <div className="modal-body">
            <div className="container">

              <div className="row mb-5">
              {orderArray.length ?
                <table className="table table-striped table-sm ">
                  <thead className="table-warning">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Позиция</th>
                      <th scope="col">Колличество</th>
                      <th scope="col">Сумма</th>
                    </tr>
                  </thead>
                  <tbody>

                    {orderArray.map((item) => (
                      <BasketRow
                        rowNumber={orderArray.indexOf(item) + 1}
                        positionName={item.productName}
                        positionQuantity={item.quantity}
                        positionSumm={item.sellPrice * item.quantity}
                        key={item.id}
                        id={item.id}
                        mode={'history'}
                        orderId={orderId}
                      />

                    ))}

                    {/* <BasketRow rowNumber={1}  positionName={"Кофе капучино S"}  positionQuantity={3} positionSumm={2000}/>
                      <BasketRow rowNumber={2}  positionName={"Шоколад MARS"}  positionQuantity={1} positionSumm={1000}/> */}

                    <tr>
                      <th scope="row">Итого</th>
                      <td></td>
                      <td></td>
                      <th>{orderSumm}&nbsp;у.е.</th>
                    </tr>
                  </tbody>
                </table>
                :
                <h3 className='text-secondary'>
                  Все позиции заказа удалены
                </h3>
              }
              </div>
              <div className="row mb-5">
                <h3>Возврат клиенту: <b className='text-danger'>{mainStore.historyChangeCounter(orderId)}</b> у.е. </h3>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { cancelBtnHandle() }}>Отмена</button>
            <button type="button" className="btn btn-primary" onClick={() => { setIsModalOpend(false) }}>Сохранить изменения</button>
          </div>
        </div>
      </div>
    </div>
  ), document.getElementById('modal'))
})
