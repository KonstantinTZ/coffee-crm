import React, { useEffect, useState } from 'react'
import './Clock.css'

export function Clock() {
  const monthNameRus = ["январья", "февралья", "марта", "апрелья", " мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]

  const monthNameEng = ["january", "february", "march", "april", "may", "juney", "july", "august", "september", "october", "november", "december"]

  const [time, setTime] = useState(new Date())
  const monthRus = monthNameRus[time.getMonth()]
  const monthEng = monthNameRus[time.getMonth()]

  useEffect(() => {
    // Создаем таймер, который срабатывает каждую секунду
    const timerID = setInterval(() => tick(), 1000)

    // Очищаем интервал при размонтировании компонента для избежания утечек памяти
    return () => clearInterval(timerID)
  }, [])

  const tick = () => {
    setTime(new Date())
  }

  return (

    // <h3 className="text-secondary clock">
    //   {time.toLocaleTimeString()}
    // </h3>
    <h4 className="text-secondary clock">
      {time.getDate()} {monthRus} {time.getFullYear()} &nbsp;
      {time.toLocaleTimeString('ru-RU')}
    </h4>
  )
}
