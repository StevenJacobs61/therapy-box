import React from 'react'
import Styles from './footer.module.css'
import { ILogin } from '../../interfaces/login'
import SignUpLogIn from '../typography/signup-login'

interface Props extends ILogin {
  handleSubmit: () => void,
  loading: Boolean,
}

const Footer: React.FC<Props> = ({setNewUser, newUser, handleSubmit, loading}) => {
  const actionStyle = {
    height: !newUser ? '45vh' : '18vh',
    margin: !newUser ? '18vh 0 0' : '0.5vh 0 0',
  }
  const classes = !newUser ? 'btn--full-d' : 'btn--full-l'
  
  return (
    <div className={Styles.container}
       style={actionStyle}>
      <button className={`btn--full ${classes} ${Styles.button}`}
      onClick={()=> loading ? null : handleSubmit()}
      style={{backgroundColor: loading ? "grey" : ''}}
      >{!newUser ? "Login" : "Register"}</button>
      <SignUpLogIn setNewUser={setNewUser} newUser={newUser}/>
    </div>
  )
}

export default Footer