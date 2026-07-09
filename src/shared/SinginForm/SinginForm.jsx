import React, { useState } from 'react'
import './SinginForm.css'
import { useStores } from '../../store/rootStore'
import {observer} from 'mobx-react-lite'

export const SinginForm = observer(() => {
  const {auth} = useStores()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [checkPass, setCheckPass] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const handleSubmit = async(e)=> {
    e.preventDefault()
    try {
      await auth.registerWithEmail(email, password)
    } catch (error) {
      console.log(error.message)
               // Ошибка уже в auth.error
      console.error(error.message)
      setErrMsg(auth.getFirebaseErrorMessage(error.message))
    }
  }

  
  return (
    <form className="col-4 card text-start p-3 m-2" id="singin-form" onSubmit={handleSubmit}>
      <h5 className="card-title">Зарегистрироваться</h5>
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
      {/* поле для проверки пароля */}
      {/* <div className="form-floating mb-4">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          value={checkPass}
          onChange={e => setCheckPass(e.target.value)}
        />
        <label htmlFor="floatingPassword">Введите пароль</label>
      </div> */}
      <div className="form-floating mb-4">
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}

        />
        <label htmlFor="floatingPassword">Повторите пароль</label>
      </div>

      <button type="submit" className="btn btn-primary" disabled={auth.loading}>
        <div className="d-flex align-items-center justify-content-center">
        {auth.loading ? 'Регистрация...' : 'Зарегистрироваться'}
        {auth.loading
          ?
          <div className="spinner-border text-secondary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div> 
          : 
          ''}
          </div>
      </button>
      <div id="emailHelp" class="form-text text-danger">{errMsg ? errMsg : " " }</div>
    </form>
  )
})
