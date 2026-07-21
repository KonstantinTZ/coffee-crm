import React from 'react'
import { LoginForm } from "../LoginForm/LoginForm"
import './LoginPage.css'
import { SinginForm } from '../SinginForm/SinginForm'

export function LoginPage() {
  return (
    <>
      <div className='container'>
        <div className="row">
          <LoginForm/>
          <SinginForm/>
        </div>
      </div>
    </>
  )
}
