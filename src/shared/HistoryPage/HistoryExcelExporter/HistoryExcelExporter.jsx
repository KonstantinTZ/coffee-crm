import React, { useState } from 'react';
import './HistoryExcelExporter.css';
import { ExcelExporterModal } from './ExcelExporterModal/ExcelExporterModal';

export function HistoryExcelExporter() {
  const [isModalOpend, setIsModalOpend] = useState(false)
  return (<>
    <button className='btn btn-warning col-6 col-lg-5 mb-3'
      onClick={() => (setIsModalOpend(true))}
    >
      Закрыть смену
    </button>
    {isModalOpend &&
      <ExcelExporterModal
        setIsModalOpend={setIsModalOpend}
      />}
  </>
  );
}
