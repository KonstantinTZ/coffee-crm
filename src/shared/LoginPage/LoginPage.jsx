import React from 'react'
import { LoginForm } from "../LoginForm/LoginForm"
import './LoginPage.css'
import { SinginForm } from '../SinginForm/SinginForm'

export function LoginPage() {
  return (
    <>
      <div className='container-xxl pt-3 pb-3 px-4'>
        <div className="row login-row">
          <LoginForm/>
          <SinginForm/>
        </div>
      </div>
    </>
  )
}
