import { React } from 'react'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react-lite'
import './ItemDescrModal.css'



export const ItemDescrModal = observer(({ setIsModalOpend, productName, descr }) => {

  function cancelBtnHandle() {
    setIsModalOpend(false)
  }
  return ReactDOM.createPortal((

    <div className="modal fade show" id="HistoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered">

        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              {productName}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { cancelBtnHandle() }}></button>
          </div>
          <div className="modal-body">
            <div className="container">
              {descr}
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { cancelBtnHandle() }}>Отмена</button>
          </div>

        </div>
      </div>
    </div>
  ), document.getElementById('modal'))
})
