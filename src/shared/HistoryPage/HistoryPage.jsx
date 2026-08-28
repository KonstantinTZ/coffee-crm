import React from 'react'
import './HistoryPage.css'
import { HistoryRow } from './HistoryRow/HistoryRow'
import { orderStore } from '../../store/orderStore'
import { observer } from 'mobx-react-lite'
import { useState, useEffect } from 'react'
import { HistoryExcelExporter } from './HistoryExcelExporter/HistoryExcelExporter'

import { NavLink } from 'react-router-dom'




export const HistoryPage = observer(() => {
  // to do пока не работает

  const [query, setQuery] = useState('')
  const [period, setPeriod] = useState('today')

  useEffect(() => {

    const { start, end } = getDateRange(period)

    orderStore.subscribeHistoryByDate(
      start,
      end
    )

    return () => {
      orderStore.unsubscribeHistory()
    }

  }, [period])

  const getDateRange = (period) => {

    const now = new Date()

    const start = new Date(now)
    const end = new Date(now)

    switch (period) {

      case 'today':

        start.setHours(0, 0, 0, 0)

        end.setDate(end.getDate() + 1)
        end.setHours(0, 0, 0, 0)

        break


      case 'yesterday':

        start.setDate(start.getDate() - 1)
        start.setHours(0, 0, 0, 0)

        end.setHours(0, 0, 0, 0)

        break


      case 'week':

        start.setDate(start.getDate() - 6)
        start.setHours(0, 0, 0, 0)

        end.setDate(end.getDate() + 1)
        end.setHours(0, 0, 0, 0)

        break

    }

    return {
      start,
      end
    }

  }

  return (
    <>
      {orderStore.historyOrders.length ?
        <div className="container-xxl pt-3 pb-3">
          <div className="row justify-content-end">
            <HistoryExcelExporter />
          </div>
          <div className="row">
            <div className="col-6 mb-3">
              <select
                className="form-select h-100"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
              >
                <option value="today">
                  За сегодня
                </option>
                <option value="yesterday">
                  Вчера
                </option>
                <option value="week">
                  Последние 7 дней
                </option>
              </select>
            </div>

            <div className="form-floating mb-3 search-control col-6">
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
        <div className='container-xxl pt-3 pb-3'>
          <h2 className='text-secondary'>
            История заказов пуста
          </h2>
          <p className="text-secondary">
            Здесь появятся заказы, отмеченные оператором как выданные клиенту на странице <NavLink className="link text-primary" to="/release" title='Перейти на страницу Выдача'>"Выдача"</NavLink>
          </p>
        </div>
      }
    </>
  )
})
