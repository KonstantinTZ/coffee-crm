import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../store/rootStore'

import './LoginForm.css'

export const LoginForm = observer(() => {
  const { auth } = useStores()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await auth.loginWithEmail(email, password)
      // Редирект или уведомление
    } catch (error) {
          // Ошибка уже в auth.error
      console.error(error.message)
      setErrMsg(auth.getFirebaseErrorMessage(error.message))
    }
  }



  return (
    <form onSubmit={handleSubmit} className="col-4 card text-start p-3 m-2" id="login-form">
      <h5 className="card-title">Войти</h5>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="floatingInput"
          placeholder="name@example.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="floatingInput">Введите Email</label>
      </div>
      <div className="form-floating mb-4">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label htmlFor="floatingPassword">Введите пароль</label>
      </div>
      <button type="submit" className="btn btn-success" disabled={auth.loading}>
        <div className="d-flex align-items-center justify-content-center">
        {auth.loading ? 'Входим...' : 'Войти'}
        {auth.loading
          ?
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> 
          : 
          ''}
          </div>
      </button>
      <div id="emailHelp" className="form-text text-danger">{errMsg ? errMsg : " " }</div>
    </form>
  )
})
