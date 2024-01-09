import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import mainStore from '../../store/mainStore';
import { observer } from "mobx-react-lite"

export const Header = observer(() => {
  return (
    <div className="header container sticky-top">

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary bg-gradient pt-3 pb-3">
        <div className="container-fluid">
          <a className="navbar-brand" href="#1">Кофейня 1</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname={"active"} to="/menu">Меню</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link position-relative" activeclassname={"active"} to="/kitchen">
                  Кухня&nbsp;
                    {mainStore.orderArray.length ?  
                  <span className="position-absolute top-1 start-0 translate-middle badge rounded-pill bg-danger">
                    {`${mainStore.orderArray.length}`}
                    <span className="visually-hidden">Колличество заказов на кухне</span>
                  </span> : ''}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link position-relative" activeclassname={"active"} to="/release">
                  Выдача&nbsp;
                    {mainStore.releaseOrderArray.length ?  
                  <span className="position-absolute top-1 start-0 translate-middle badge rounded-pill bg-danger">
                    {`${mainStore.releaseOrderArray.length}`}
                    <span className="visually-hidden">Колличество заказов на выдачу</span>
                  </span> : ''}
                  </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname={"active"} to="/order-board">Табло</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" activeclassname={"active"} to="/history">История</NavLink>
              </li>
            </ul>
            <form className="d-flex">
              <NavLink className="btn btn-success bg-gradient" activeclassname={"active"} to="/basket">
                Заказ&nbsp;
                {mainStore.basketArray.length ? <span className="badge bg-danger">{`${mainStore.totalOrderQuantity}`}</span> : ''}
              </NavLink>
            </form>
          </div>
        </div>
      </nav>

    </div>
  );
})
