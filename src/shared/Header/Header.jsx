import React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <div className="header container sticky-top">

      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#1">Кофейня 1</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link"  activeclassname={"active"} to="/menu">Меню</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link"  activeclassname={"active"} to="/kitchen">Кухня</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link"  activeclassname={"active"} to="/release">Выдача</NavLink>
              </li>
              <li className="nav-item">
              <NavLink className="nav-link"  activeclassname={"active"} to="/order-board">Табло</NavLink>
              </li>
            </ul>
            <form className="d-flex">
              <NavLink className="btn btn-success"  activeclassname={"active"} to="/basket">Заказ</NavLink>
            </form>
          </div>
        </div>
      </nav>

    </div>
  );
}
