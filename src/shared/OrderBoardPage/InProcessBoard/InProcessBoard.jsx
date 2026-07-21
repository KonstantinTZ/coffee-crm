import './InProcessBoard.css'
import {React, useEffect} from 'react'
import { OrderNumber } from '../OrderNumber/OrderNumber'
import mainStore from '../../../store/mainStore'
import { observer } from 'mobx-react-lite'
import 'animate.css'

import authStore from '../../../store/authStore'
import { orderStore } from '../../../store/orderStore'


export const InProcessBoard = observer(() => {
  function navigationOpenerHandler() {
    mainStore.isNavigationOpen = !mainStore.isNavigationOpen
  }

  return (
    <div className="col-6 in-procsess-container">
      <h1 className='display-4 text-danger mb-5'>В процессе</h1>
      <div className="row">
        {
          orderStore.kitchenOrders.map((item) => (
            <OrderNumber orderNumber={item.orderNumber} bootstrapColorClass={'danger'} key={item.id} />
          ))
        }



      </div>
      <button
        className='btn btn-outline-secondary btm-menu-open animate__animated animate__headShake'
        onClick={() => { navigationOpenerHandler() }}
      >
        {
          mainStore.isNavigationOpen
            ?
            'Закрыть '
            :
            'Открыть '
        }
        навигацию
      </button>
    </div>
  )
})
