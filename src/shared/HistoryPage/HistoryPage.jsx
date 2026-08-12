import React from 'react';
import './HistoryPage.css';
import { HistoryRow } from './HistoryRow/HistoryRow';
import { orderStore } from '../../store/orderStore';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { HistoryExcelExporter } from './HistoryExcelExporter/HistoryExcelExporter';




export const HistoryPage = observer(() => {
  // to do пока не работает

  const [query, setQuery] = useState('')

  return (
    <>
      {orderStore.historyOrders.length ?
        <div className="container">
          <div className="row justify-content-end">
            <HistoryExcelExporter/>
          </div>



          <div className="form-floating row mb-3 search-control">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="Поиск по номеру ..."
              maxLength={3}
              value={query}
              onChange={(elem) => setQuery(elem.target.value.toUpperCase())}
            />
            <label htmlFor="floatingInput">Поиск по номеру ...</label>
            <button type="button" className="btn-close btn-search-clean"
              onClick={() => setQuery('')}></button>
          </div>


          <div className="row mb-5">
            <table className="table table-striped align-middle table-sm">
              <thead className="table-warning">
                <tr>
                  <th scope="col">Время</th>
                  <th scope="col">Номер</th>
                  <th scope="col">Сумма</th>
                  <th scope="col">Позиции</th>
                  <th scope="col">Действие</th>
                </tr>
              </thead>
              <tbody>
                {
                  orderStore.historyOrders.filter((item) => item.orderNumber.toUpperCase().includes(query)).map((item) => (
                    <HistoryRow
                      orderCreatedAt={item.createdAt}
                      orderNumber={item.orderNumber}
                      orderSumm={item.totalAmount}
                      orderArray={item.items}
                      key={item.id}
                      orderId={item.id}
                    />
                  ))
                }
              </tbody>
            </table>
          </div>

        </div>
        :
        <h2 className='text-secondary'>
        История заказов пуста
        </h2>
      }
    </>
  );
})
