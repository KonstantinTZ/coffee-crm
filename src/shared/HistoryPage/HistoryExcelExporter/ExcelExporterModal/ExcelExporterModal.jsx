import React from 'react';
import './ExcelExporterModal.css';
import ReactDOM from 'react-dom'
import * as XLSX from 'xlsx';
import mainStore from '../../../../store/mainStore';

export function ExcelExporterModal({setIsModalOpend}) {

  let toDay = new Date()
  let toDayLocale = toDay.toLocaleDateString()

  function exportHandler () {
    setIsModalOpend(false)
    let workBook = XLSX.utils.book_new()
    let workSheet = XLSX.utils.json_to_sheet(mainStore.exportData)

    XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet#1')
    XLSX.writeFile(workBook, `report_${toDayLocale}.xlsx`)
    mainStore.historyArrayCleaner();
  }

  return ReactDOM.createPortal((

    <div className="modal fade show" id="HistoryModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-modal="true" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Закрытие смены</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => { setIsModalOpend(false) }}></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <h2 className='text-danger'>Вы хотите экспортировать данные в Excel и очистить историю?</h2>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { setIsModalOpend(false) }}>Отмена</button>
            <button type="button" className="btn btn-success" onClick={() => { exportHandler() }}>Экспорт в Excel</button>
          </div>
        </div>
      </div>
    </div>
  ), document.getElementById('modal'))
};
