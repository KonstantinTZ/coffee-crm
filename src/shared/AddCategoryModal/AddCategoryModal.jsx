import { React, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react-lite'
import { menuStore } from '../../store/menuStore'
import './AddCategoryModal.css'



export const AddCategoryModal = observer(({ setIsModalOpend, modalMode, categoryId }) => {


  const [category, setCategory] = useState({ value: '', label: '' })

  useEffect(() => {
    if (categoryId) {
      setCategory(menuStore.getCategoryById(categoryId))
      console.log('categoryId->', categoryId)
    }
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target

    setCategory(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  function cancelBtnHandle() {
    setIsModalOpend(false)
  }


  function saveCategoryHandler() {
    menuStore.addCategory(category)
    setIsModalOpend(false)
  }
  function changeCategoryHandler() {
    menuStore.updateCategory(category.value, category.label)
    setIsModalOpend(false)
  }

  function removeCategoryHandler() {
    menuStore.removeCategory(category.value)
    setIsModalOpend(false)
  }

  return ReactDOM.createPortal((

    <div className="modal fade show" id="HistoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered">

        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {modalMode === 'changeCategory' ? 'Изменение категории' : 'Добавление категории'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { cancelBtnHandle() }}></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="form-floating mb-3">
                <input
                  value={category.label}
                  onChange={handleChange}
                  name="label"
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Введите категорию блюда/напитка"
                />
                <label htmlFor="floatingInput">Введите категорию блюда/напитка</label>
              </div>
            </div>
          </div>
          
            {modalMode === 'changeCategory' ?
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { cancelBtnHandle() }}>Отмена</button>
                <button type="button" className="btn btn-success" onClick={changeCategoryHandler}>Сохранить изменения</button>
                <button type="button" className="btn btn-danger" onClick={removeCategoryHandler}>Удалить категорию</button>
              </div>
              :
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { cancelBtnHandle() }}>Отмена</button>
                <button type="button" className="btn btn-primary" onClick={saveCategoryHandler}>Сохранить изменения</button>
              </div>
          }
        </div>

      </div>
    </div>
  ), document.getElementById('modal'))
})
