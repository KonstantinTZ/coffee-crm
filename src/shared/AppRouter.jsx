import React, { useEffect } from 'react';
import {Route, Routes, Navigate } from 'react-router-dom'
import mainStore from '../store/mainStore.js';
import {privateRoutes, publicRoutes} from "../utils/routes";
import { LOGIN_ROUTE, MENU_ROUTE } from "../utils/consts";


const AppRouter = () => {
      useEffect(() => {
        mainStore.copyMenuArray();  
        window.addEventListener('storage', (e) => {
          if (e.key === 'mainStore') {
            mainStore.hydrateStore()
          }
        });  
        return () => window.removeEventListener('storage', (e)=>{})
        
      }, [])
    const user = false

    return user ?
        (
            <div className="main container pt-3 pb-3">
            <Routes>
                {privateRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component} exact={true}/>
                )}
                <Route path="*" element={<Navigate to={MENU_ROUTE} replace />} />
            </Routes>
            </div>
        )
        :
        (
            <div className="main container pt-3 pb-3">
            <Routes>
                {publicRoutes.map(({path, Component}) =>
                    <Route key={path} path={path} element={Component} exact={true}/>
                )}
                <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
            </Routes>
            </div>
        )
};

export default AppRouter;
