import './InProcessBoard.css';
import { OrderNumber } from '../OrderNumber/OrderNumber';
import mainStore from '../../../store/mainStore';
import { observer } from 'mobx-react-lite';
import 'animate.css';


export const InProcessBoard = observer(() => {
  function navigationOpenerHandler () {
    mainStore.isNavigationOpen = !mainStore.isNavigationOpen
  }

  return (
    <div className="col-6 in-procsess-container">
      <h1 className='display-4 text-danger mb-5'>В процессе</h1>
      <div className="row">
        {
          mainStore.orderArray.map((item) => (
            <OrderNumber orderNumber={item.orderNumber} bootstrapColorClass={'danger'} key={item.orderId} />
          ))
        }



      </div>
      <button 
      className='btn btn-outline-secondary btm-menu-open animate__animated animate__headShake'
      onClick = {()=>{navigationOpenerHandler ()}}
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
  );
})
