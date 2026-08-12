import React, { useState, useEffect, useMemo } from 'react'
import ReactDOM from 'react-dom'
import './HistoryModal.css'
import { observer } from "mobx-react-lite"

import { orderStore } from '../../../store/orderStore'
import { Loader } from '../../Loader/Loader'


export const HistoryModal = observer(({ setIsModalOpend, orderNumber, orderArray, orderSumm, orderId }) => {

  // ======================================
  // Локальная копия позиций заказа
  // ======================================

  const [editedItems, setEditedItems] = useState(
    () => orderArray.map(item => ({ ...item }))
  )

  const [currency, setCurrency] = useState(orderArray?.[0]?.currency)

  console.log('editedItems->', editedItems)

  const [isSaving, setIsSaving] = useState(false)

  // Если orderArray изменился снаружи

  useEffect(() => {

    setEditedItems(
      orderArray.map(item => ({ ...item }))
    )

  }, [orderArray])


  // общая сумма после изменений

  const newTotal = useMemo(() => {

    return editedItems.reduce(
      (total, item) => {
        return total + item.sellPrice * item.quantity
      },
      0
    )

  }, [editedItems])

  //Возврат клиенту

  const refundAmount = Math.max(0, orderSumm - newTotal)


  function cancelBtnHandle() {
    setIsModalOpend(false)
  }

  // Уменьшить количество
  // ======================================

function decreaseQuantity(index) {

    setEditedItems(prevItems => {

        return prevItems
            .map((item, itemIndex) => {

                if (itemIndex !== index) {
                    return item
                }

                return {
                    ...item,
                    quantity: item.quantity - 1
                }

            })
            .filter(item => item.quantity > 0)

    })

}
  // Сохранение
  // ======================================

  async function saveChanges() {

    try {

      setIsSaving(true)

      await orderStore.updateOrder(
        orderId,
        {
          items: editedItems,
          totalAmount: newTotal
        }
      )

      setIsModalOpend(false)

    } catch (error) {

      console.error(
        'Ошибка при изменении заказа:',
        error
      )

    } finally {

      setIsSaving(false)

    }

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
                {editedItems.length ?
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

                      {editedItems.map((item,index) => (
                        <tr className='align-middle'>
                          <th scope="row">{index + 1}</th>
                          <td>{item.productName}</td>
                          <td className='d-flex justify-content-center'>

                            <div className="basket-counter-container d-flex align-items-center">
                              <button className="btn btn-primary counter-btn-decrease" onClick={()=>{decreaseQuantity(index)}} > - </button>
                              <span className="counter-display"><b>{item.quantity}</b>&nbsp;шт.</span>
                              <button className="btn btn-primary counter-btn-increase" disabled={true}> + </button>
                            </div>
                          </td>
                          <td>{item.quantity* item.sellPrice}&nbsp;{item.currency}</td>
                        </tr>
                      ))}
                      <tr>
                        <th scope="row">Итого</th>
                        <td></td>
                        <td></td>
                        <th>{newTotal}&nbsp;{currency}</th>
                      </tr>
                    </tbody>
                  </table>
                  :
                  <h3 className='text-secondary'>
                    Все позиции заказа удалены
                  </h3>
                }
              </div>
              {refundAmount > 0 && (
              <div className="row mb-5">
                <h3>Возврат клиенту:
                  <b className='text-danger'>&nbsp;{refundAmount}</b> {currency}
                </h3>
              </div>
              )}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { cancelBtnHandle() }} disabled={isSaving}>Отмена</button>
            <button type="button" className="btn btn-primary" onClick={saveChanges} disabled={isSaving}>
              {isSaving ? 'Сохранение...' : 'Сохранить'}
              </button>
          </div>
        </div>
      </div>
      <Loader isLoading={isSaving} />
    </div>
  
  ), document.getElementById('modal'))
})
