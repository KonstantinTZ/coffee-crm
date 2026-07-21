import { MENU_ROUTE, LOGIN_ROUTE,KITCHEN_ROUTE,RELEASE_ROUTE,ORDERBOARD_ROUTE,BASKET_ROUTE,HISTORY_ROUTE, SETTINGS_ROUTE } from "./consts.js"
import { LoginPage } from "../shared/LoginPage"
import { MenuPage } from "../shared/MenuPage/MenuPage.jsx"
import { KitchenPage } from "../shared/KitchenPage/KitchenPage.jsx"
import { ReleaseOrderPage } from "../shared/ReleaseOrderPage/ReleaseOrderPage.jsx"
import { OrderBoardPage } from "../shared/OrderBoardPage/OrderBoardPage.jsx"
import { BasketPaige } from "../shared/BasketPaige/BasketPaige.jsx"
import { HistoryPage } from "../shared/HistoryPage/HistoryPage.jsx"
import { SettingsPage } from "../shared/SettingsPage/SettingsPage.jsx"


export const publicRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <LoginPage />
    }
]

export const privateRoutes = [
    {
        path: MENU_ROUTE,
        Component: <MenuPage />
    },
    {
        path: KITCHEN_ROUTE,
        Component: <KitchenPage />
    },
    {
        path: RELEASE_ROUTE,
        Component: <ReleaseOrderPage />
    },
    {
        path: ORDERBOARD_ROUTE,
        Component: <OrderBoardPage />
    },
    {
        path: BASKET_ROUTE,
        Component: <BasketPaige />
    },
    {
        path: HISTORY_ROUTE,
        Component: <HistoryPage />
    },
    {
        path: SETTINGS_ROUTE,
        Component: <SettingsPage />
    }
]


// <Route path="/kitchen" element={<KitchenPage />} />
// <Route path="/release" element={<ReleaseOrderPage />} />
// <Route path="/order-board" element={<OrderBoardPage/>} />
// <Route path="/basket" element={<BasketPaige/>} />
// <Route path="/history" element={<HistoryPage/>} />
// <Route path="/login" element={<LoginPage/>} />