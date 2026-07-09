import React from 'react'
import './SettingsPage.css'
import { observer } from "mobx-react-lite"
import { useStores } from '../../store/rootStore'

export function SettingsPage() {
  const { auth } = useStores()

  return (
    <div className="main container pt-3 pb-3">
      <div className="row">
        <div className="col-2 "></div>
        <div className="col-2 "></div>
        <div className="col-2 "></div>
        <div className="col-2 "></div>
        <div className="col-2 "></div>
        <div className="col-2 d-flex align-items-center justify-content-end">
          <button className="btn btn-danger pl-2" onClick={() => { auth.logout() }}>
            Выйти
          </button>
        </div>
      </div>
    </div>
  )
}
