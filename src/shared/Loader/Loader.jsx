import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import './Loader.css'

export const Loader = ({ isLoading, text = 'Загрузка...' }) => {
  // Управляет фактическим наличием компонента в DOM
  const [shouldRender, setShouldRender] = useState(isLoading)
  // Управляет запуском CSS-анимации
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setShouldRender(true)
      // Маленькая задержка, чтобы браузер успел применить начальные стили перед анимацией
      const timeout = setTimeout(() => setAnimate(true), 10)
      document.body.classList.add('overflow-hidden')
      return () => clearTimeout(timeout)
    } else {
      setAnimate(false)
      // Ждем завершения анимации исчезновения (200мс), прежде чем удалить из DOM
      const timeout = setTimeout(() => {
        setShouldRender(false)
        document.body.classList.remove('overflow-hidden')
      }, 200)
      return () => clearTimeout(timeout)
    }
  }, [isLoading])

  // Возвращаем null при очистке в useEffect
  useEffect(() => {
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [])

  if (!shouldRender) return null

  return ReactDOM.createPortal(
    <div 
      className={`loader-overlay d-flex justify-content-center align-items-center ${animate ? 'fade-in' : 'fade-out'}`} 
      role="alert" 
      aria-busy="true"
    >
      <div className={` p-4 rounded  d-flex flex-column align-items-center ${animate ? 'scale-up' : 'scale-down'}`} style={{ minWidth: '200px' }}>
        <div className="spinner-grow text-secondary" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden text-light">Загрузка...</span>
        </div>
        {text && <p className="mt-3 mb-0 text-dark fw-medium">{text}</p>}
      </div>
    </div>,
    document.getElementById('modal') || document.body
  )
}