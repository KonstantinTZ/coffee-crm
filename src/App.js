import { React, useEffect } from 'react'
import './App.css'
import AppRouter from './shared/AppRouter'
import { Header } from './shared/Header/Header'

import { orderStore } from './store/orderStore'
import authStore from './store/authStore'


function App() {
  return (
    <div className="App">
      <>
        <Header />
        <AppRouter />
      </>
    </div>
  )
}

export default App
