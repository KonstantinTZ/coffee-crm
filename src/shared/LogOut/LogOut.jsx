import React from 'react'
import './LogOut.css'
import { observer } from "mobx-react-lite"
import { useStores } from '../../store/rootStore'
import { basketStore } from '../../store/basketStore'

export const LogOut = observer(() => {
  // todo отказаться от useStores
  const { auth } = useStores()
  function logOutBtnHandler() {
    auth.logout()
    basketStore.clearBasket()
  }

  return (
    <button className="btn btn-danger pl-2" onClick={logOutBtnHandler}>
      Выйти
    </button>
  )
})
