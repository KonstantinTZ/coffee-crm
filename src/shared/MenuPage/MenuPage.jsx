import React from 'react'
import './MenuPage.css'
import { MenuItem } from '../../../src/shared/MenuPage/MenuItem'
import { observer } from "mobx-react-lite"
import mainStore from '../../store/mainStore'
import { useState, useEffect } from 'react'

// new

import { menuStore } from '../../store/menuStore'
import { Loader } from '../Loader/Loader'

// new




export const MenuPage = observer(() => {
  const [filter, setFilter] = useState('')

  useEffect(() => {
    // Загружаем меню при монтировании компонента
    menuStore.loadMenuFromFirebase()
  }, [])

  // 2. Как только категории загрузились из Firebase, автоматически выбираем первую
  useEffect(() => {
    if (menuStore.categoriesForSelect.length > 0 && !filter) {
      setFilter(menuStore.categoriesForSelect[0].value)
    }
  }, [menuStore.categoriesForSelect, filter])

  return (
    <>
      {
        menuStore.categoriesForSelect.length > 0
          ?
          <>
            <div className="container row mb-3">

              <ul className="nav nav-tabs flex-nowrap">
                {menuStore.categoriesForSelect.map((item) => (
                  <li key={item.value} className="nav-item">
                    <button
                      className={`nav-link ${filter === item.value ? 'active' : ''}`}
                      onClick={() => setFilter(item.value)}
                    >
                      {item.label}</button>
                  </li>
                ))}
              </ul>

            </div>

            <div className="row row-cols-auto">

              {menuStore.getItemsByCategoryId(filter).map((item) => (
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

          </>
          :
          <h2 className='text-secondary'>
            Нет ни одной позиции меню
          </h2>
      }


      <Loader isLoading={menuStore.isLoading} />
    </>

  )
})

