import React, { useState } from 'react'
import Styles from './input-fields.module.css'
import { IUser } from "../../interfaces/login"

interface inputs extends IUser {
  handleSubmit:any
}

const InputFields: React.FC<inputs> = ({...Props}) => {

    let contStyle = Props.newUser ? Styles.containerCol : Styles.containerRow;

    const handleEnter = (e:React.KeyboardEvent<HTMLInputElement>) => {
      {if (e.key === 'Enter') 
      {Props.handleSubmit()}}
    }

  return (
    <section className={Styles.section}>
        <div className={contStyle}>
            <input type='text' className={`input input--caps ${Styles.input}`} placeholder={"Username"}
            onChange={(e) => Props.setUsername(e.target.value)}
            onKeyDown={handleEnter}/>
            <input type='password' className='input input--caps' placeholder={"Password"} 
            onChange={(e) => Props.setPassword(e.target.value)}
            onKeyDown={handleEnter}/>
        </div>
       {Props.newUser ? 
       <div className={contStyle}>
        <input type='email' className='input input--caps' placeholder={"email"}
        onChange={(e) => Props.setEmail(e.target.value)}
        onKeyDown={handleEnter}/>
        <input type='password' className='input input--caps' placeholder={"confirm"}
        onChange={(e) => Props.setConfirm(e.target.value)}
        onKeyDown={handleEnter}/>
        </div> 
        :null}
    </section>
  )
}

export default InputFields