import React, { useState } from 'react'
import InputFields from '../../components/inputs/input-fields'
import Footer from '../../components/login/footer'
import Styles from './login.module.css'
import { auth, getUserEmail, setProfilePicture } from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useNavigate } from "react-router-dom";
import {collection, setDoc, doc} from 'firebase/firestore'
import { db } from '../../config/firebase'
import UploadImg from '../../components/login/upload-img'


const Login : React.FC = () => {
  const navigate = useNavigate()
  const [newUser, setNewUser] = useState<Boolean>(false);
  const [loading, setLoading] = useState<Boolean>(false);

  
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [confirm, setConfirm] = useState<string>('');
  const [file, setFile] = useState<File | null>()

  const handleSubmit = () =>{
    if(newUser && confirm !== password){
      alert("Passwords do not match.")
    }else if(!username || !password || newUser && !email){
      alert("Please complete all fields.")
    }else{
      if(loading) return
      else{
        setLoading(true)
        handleAuth();
      }
    }
  }

  const handleAuth = async () => {
    const createUser = async () => {
      const users = collection(db, "Users");
  const { uid }:any = auth.currentUser;
  await setDoc(doc(users, uid), {
    email,
    username,
    tasks: []
  })
  const user = auth.currentUser;
  if (user) {
  await updateProfile(user, {
    displayName: username
  });
}
  };
  try{
    if(newUser){
      await createUserWithEmailAndPassword(auth, email, password);
      await createUser()
      // upload profile pic, to ProfilePics/currentUser.uid.png
      setProfilePicture(file, auth.currentUser)
      alert("Registered!")
      navigate("/", {replace: true});
    }else{
        const email = await getUserEmail(username);
        await signInWithEmailAndPassword(auth, email, password);
        navigate("/", {replace: true});
      }
  }catch(err:any){
      console.error(err)
      alert(err.message)
  }
  setLoading(false)
  }


  return (
    <div className={`flex--col ${Styles.section}`}>
    <InputFields 
    newUser={newUser} 
    setUsername={setUsername} 
    setPassword={setPassword}
    password={password}
    setEmail={setEmail}
    setConfirm={setConfirm}
    handleSubmit={handleSubmit}
    />
   <UploadImg 
   newUser={newUser} 
   loading={loading}
   setFile={setFile}/>
     <Footer 
     setNewUser={setNewUser} 
     newUser={newUser} 
     handleSubmit={handleSubmit}
     loading={loading}/>
    </div>
  )
}

export default Login