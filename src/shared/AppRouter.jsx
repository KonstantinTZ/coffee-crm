import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { privateRoutes, publicRoutes } from "../utils/routes"
import { LOGIN_ROUTE, MENU_ROUTE } from "../utils/consts"
import { observer } from 'mobx-react-lite'
import { useStores } from '../store/rootStore.js'


const AppRouter = observer(() => {

    const { auth } = useStores()
    const user = auth.isAuthenticated

    return user ?
        (
            <div className="main container-xxl pt-3 pb-3">
                <Routes>
                    {privateRoutes.map(({ path, Component }) =>
                        <Route key={path} path={path} element={Component} exact={true} />
                    )}
                    <Route path="*" element={<Navigate to={MENU_ROUTE} replace />} />
                </Routes>
            </div>
        )
        :
        (
            <div className="main container pt-3 pb-3">
                <Routes>
                    {publicRoutes.map(({ path, Component }) =>
                        <Route key={path} path={path} element={Component} exact={true} />
                    )}
                    <Route path="*" element={<Navigate to={LOGIN_ROUTE} replace />} />
                </Routes>
            </div>
        )
})

export default AppRouter
