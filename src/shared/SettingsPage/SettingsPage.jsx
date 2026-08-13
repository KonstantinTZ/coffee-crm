import { React, useState, useEffect } from 'react'
import './SettingsPage.css'
import { observer } from "mobx-react-lite"
import { AddItemModal } from '../AddItemModal/AddItemModal'
import { AddCategoryModal } from '../AddCategoryModal/AddCategoryModal'
import { Loader } from '../Loader/Loader'

import { menuStore } from '../../store/menuStore'

export const SettingsPage = observer(() => {
  const [itemId, setItemId] = useState(null)
  const [isItemModalOpend, setIsItemModalOpend] = useState(false)
  const [isCategoryModalOpend, setIsCategoryModalOpend] = useState(false)
  const [modalMode, setModalMode] = useState(null)
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

  function addItemBtnHandler() {
    setIsItemModalOpend(true)
    setItemId(null)
  }
  function changeItemBtnHandler(itemId) {
    setItemId(itemId)
    setIsItemModalOpend(true)
  }
  function addCategoryBtnHandler() {
    setIsCategoryModalOpend(true)
    setFilter('')
    setModalMode('addCategory')
  }

  function changeCategoryBtnHandler() {
    setIsCategoryModalOpend(true)
    setModalMode('changeCategory')
  }

  // if (menuStore.isLoading) {
  //   return <div>Загрузка...</div>
  // }

  return (
    <div className="main container pt-3 pb-3">
      <div className="row mb-3">
        <h3 className='text-secondary'>
          Настройки меню
        </h3>
        <p className='text-secondary'>
          Добавьте категории и пункты меню
        </p>
      </div>
      {/* строка с категориями */}
      <div className="row mb-3">
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

          <li className="nav-item" title="добавить категорию">
            <button className={`nav-link `}
              onClick={addCategoryBtnHandler}
            >
              <img width="25" height="25" src={require(`../../../src/img/add-item.png`)} alt="Добавить пункт" />
            </button>
          </li>
        </ul>


      </div>

      {
        menuStore.categoriesForSelect.length > 0
          ?
          <>
            <div className="row mb-3">
              {/* кнопка изменить категорю */}
              <div className="col-2 "></div>
              <div className="col-2 "></div>
              <div className="col-2 "></div>
              <div className="col-2 "></div>
              <div className="col-2 "></div>
              <div className="col-2 d-flex align-items-center justify-content-end">
                <button className="btn btn-warning pl-2" onClick={() => { changeCategoryBtnHandler() }}>
                  Изменить категорию
                </button>
              </div>
            </div>

            <div className="row row-cols-auto">
              {/* кнопка добавить пункт/загрузка пунктов */}
              {menuStore.getItemsByCategoryId(filter).map((item) => (
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12  mb-3" title="Кликните для внесения изменений">
                  <div className={`card h-100 `} onClick={() => { changeItemBtnHandler(item.id) }}>
                    <img
                      src={require(`../../../src/img/no-image-plug.png`)}
                      className="card-img-top"
                      alt="изображение продукта"
                    />
                    <div className="card-body ">
                      <h5 className="card-title text-start">{item.productName}</h5>
                      <p className="card-text text-start text-secondary mb-1">Объем: {item.volume} {item.measure}</p>
                      <p className="card-text text-start ">Цена: <b>{item.sellPrice}</b> {item.currency}</p>
                    </div>
                  </div>
                </div>

              ))}

              <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12  mb-3" title="Добавьте пункт меню">
                <div className={`card h-100`} onClick={addItemBtnHandler}>
                  <div className="card-body d-flex align-items-center justify-content-center" title="добавить пункт меню">
                    <img src={require(`../../../src/img/add-item.png`)} alt="Добавить пункт меню" />
                  </div>
                </div>
              </div>
            </div>
          </>
          :
          null

      }




      {isItemModalOpend &&
        <AddItemModal
          setIsModalOpend={setIsItemModalOpend}
          modalMode={modalMode}
          itemId={itemId}
          categoryId={filter}
        />
      }
      {isCategoryModalOpend &&
        <AddCategoryModal
          setIsModalOpend={setIsCategoryModalOpend}
          modalMode={modalMode}
          categoryId={filter}
        />
      }
      <Loader isLoading={menuStore.isLoading} />
    </div>
  )
})
