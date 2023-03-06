import React from 'react'
import { ILogin } from '../../interfaces/login'
import Styles from "../login/footer.module.css"



const SignUpLogIn: React.FC<ILogin> = ({setNewUser, newUser}) => {

const textOne = !newUser ? "New to the hackathon" : "Already registerd"
const textTwo = !newUser ? "Sign Up" : "Login"

  return (
    <h2 className={Styles.footerTitle}>
    <span style={{color: "var(--color-white)"}}
    >{textOne}?</span>
    <span style={{color: "var(--color-yellow)", cursor: "pointer"}}
    onClick={() => setNewUser(!newUser)}
    > {textTwo}</span>
  </h2>
  )
}

export default SignUpLogIn