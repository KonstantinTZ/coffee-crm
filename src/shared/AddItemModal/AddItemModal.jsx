import { React, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react-lite'
import { menuStore } from '../../store/menuStore'
import './AddItemModal.css'



export const AddItemModal = observer(({ setIsModalOpend, modalMode, itemId, categoryId }) => {

  const initialItem = {
    id: 0,
    productName: '',
    volume: '',
    measure: 'мл.',
    currency: 'RUB',
    costPrice: '',
    sellPrice: '',
    imgPath: '',
    extraSettings: false,
    descr: 'Состав: '
  }


  // const [category, setCategory] = useState({ value: '', label: '' })
  const [item, setItem] = useState(initialItem)

  useEffect(() => {
    if (itemId) {
      setItem(menuStore.getItemById(itemId))
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setItem(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  function cancelBtnHandle() {
    setIsModalOpend(false)
  }

  function saveItemHandler() {
    menuStore.addItemToCategory(categoryId, item)
    setIsModalOpend(false)
  }

  function changeItemHandler() {
    menuStore.updateItem(categoryId, item.id, item)
    setIsModalOpend(false)
  }

  function removeItemHandler() {
    menuStore.removeItem(categoryId, item.id)
    setIsModalOpend(false)
  }



  return ReactDOM.createPortal((

    <div className="modal fade show" id="HistoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered">

        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {
                itemId ?
                  "Изменить пункт меню"
                  :
                  "Добавить пункт меню"
              }
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { cancelBtnHandle() }}></button>
          </div>
          <div className="modal-body">
            <div className="container">

              {/* <div className="dropdown mb-3">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {
                    category.label
                      ? category.label
                      :
                      "Выберите категорию"
                  }
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  {menuStore.categoriesForSelect.map(i => (
                    <li key={i.value} >
                      <span className="dropdown-item" onClick={() => setCategory({ value: i.value, label: i.label })}>
                        {i.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div> */}


              <div className="form-floating mb-3">
                <input
                  value={item.productName ? item.productName : ''}
                  onChange={handleChange}
                  name="productName"
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Введите название блюда/напитка"
                />
                <label htmlFor="floatingInput">Введите название блюда/напитка</label>
              </div>


              <div className="input-group mb-3 form-floating">
                <input
                  aria-label="Ввод текста с помощью раскрывающейся кнопки"
                  value={item.volume ? item.volume : ''}
                  onChange={handleChange}
                  name="volume"
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Введите объем блюда/напитка"

                />
                <label for="floatingInput">Введите объем блюда/напитка</label>
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {
                    item.measure
                      ? item.measure
                      :
                      "Выберите объём"
                  }
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li >
                    <span className="dropdown-item"
                      onClick={() => setItem(prev => ({ ...prev, measure: 'мл.' }))}
                    >
                      мл.
                    </span>
                  </li>

                  <li  >
                    <span className="dropdown-item"
                      onClick={() => setItem(prev => ({ ...prev, measure: 'гр.' }))}
                    >
                      гр.
                    </span>
                  </li>

                  <li >
                    <span className="dropdown-item"
                      onClick={() => setItem(prev => ({ ...prev, measure: 'шт.' }))}
                    >
                      шт.
                    </span>
                  </li>

                </ul>
              </div>

              {/* start */}

              <div className="input-group mb-3 form-floating">
                <input
                  aria-label="Ввод текста с помощью раскрывающейся кнопки"
                  value={item.sellPrice ? item.sellPrice : ''}
                  onChange={handleChange}
                  name="sellPrice"
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Введите цену продажи"

                />
                <label for="floatingInput">Введите цену продажи</label>
                <button
                  className="btn btn-outline-secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {
                    item.currency
                      ? item.currency
                      :
                      "Выберите валюту"
                  }
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li >
                    <span className="dropdown-item"
                      onClick={() => setItem(prev => ({ ...prev, currency: 'RUB' }))}
                    >
                      RUB
                    </span>
                  </li>

                  <li  >
                    <span className="dropdown-item"
                      onClick={() => setItem(prev => ({ ...prev, currency: 'USD' }))}
                    >
                      USD
                    </span>
                  </li>

                </ul>
              </div>

              {/* end */}


              <div className="form-floating mb-3">
                <input
                  value={item.costPrice ? item.costPrice : ''}
                  onChange={handleChange}
                  name="costPrice"
                  type="number"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Введите себестоимость"
                />
                <label htmlFor="floatingInput">Введите себестоимость</label>
              </div>

              <div className="form-floating mb-3">
                <textarea
                  value={item.descr ? item.descr : ''}
                  onChange={handleChange}
                  name="descr"
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Введите описание/состав"
                  rows="3"
                ></textarea>
                <label htmlFor="floatingInput">Введите описание/состав</label>
              </div>

            </div>
          </div>
          {
            itemId ?
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { cancelBtnHandle() }}>Отмена</button>
                <button type="button" className="btn btn-success" onClick={changeItemHandler}>Сохранить изменения</button>
                <button type="button" className="btn btn-danger" onClick={removeItemHandler}>Удалить пункт меню</button>
              </div>

              :

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { cancelBtnHandle() }}>Отмена</button>
                <button type="button" className="btn btn-primary" onClick={saveItemHandler}>Сохранить</button>
              </div>


          }
        </div>
      </div>
    </div>
  ), document.getElementById('modal'))
})
