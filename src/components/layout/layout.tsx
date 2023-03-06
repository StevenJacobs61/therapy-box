import React, { ReactNode, useEffect, useState } from 'react'
import Styles from '../layout/layout.module.css'
import { useLocation } from 'react-router-dom'
import { auth} from '../../config/firebase'
import { useNavigate } from "react-router-dom";
import UseProfilePic from '../../hooks/useProfilePicture';

interface LayoutProps {
    children: ReactNode
}

const Layout : React.FC<LayoutProps> = ({children}) => {

  const [loading, setLoading] = useState(true)
  const [headerText, setHeaderText] = useState<string>('')
  const [center, setCenter] = useState<boolean>(false)
  const [showHome, setShowHome] = useState<boolean>(false)
  const welcomeString = "good day" + " " + auth.currentUser?.displayName
  const [profileImage, setProfileImage] = useState<string>('')
  const {profilePic} = UseProfilePic({setLoading});
  

  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirect if not logged in
 useEffect(() => {
  const timeout = setTimeout(() => {
    if(!auth.currentUser?.uid && location.pathname !== '/login'){
      navigate("/login", {replace: true})
    } else if(auth.currentUser && location.pathname === "/login") {
      navigate("/", {replace: true})
    }
  }, 2000)
    return () => clearTimeout(timeout)
}, [])

useEffect(()=> {
  setProfileImage(profilePic)
}, [profilePic])

// Control page title
  useEffect(() => {
    const currentEndpoint = location.pathname;
    if(currentEndpoint === "/login"){
      setHeaderText("Hackathon");
      setCenter(true);
      setShowHome(false);
    }
    else if(currentEndpoint === "/"){
      setCenter(true)
      setHeaderText(welcomeString.slice(0).charAt(0).toUpperCase() + welcomeString.slice(1))
      setShowHome(false);
    }
    else {
      if(currentEndpoint === '/photos'){
        setShowHome(true);
        setCenter(true)
      }else{
        setCenter(false)
        setShowHome(true);
      }
      setHeaderText(currentEndpoint.slice(1).charAt(0).toUpperCase() + currentEndpoint.slice(2))
    }
  }, [location.pathname]);

  // Logout
  const logout = async () => {
    try {
      await auth.signOut()
      alert("Logged out");
      navigate("/login")
    } catch (error) {
      console.error(error)
    }
  }

const headerStyle: React.CSSProperties = {
  textAlign: center ? 'center' : 'left',
  margin: center ?  "" :'0 0 0 2rem',
}

  return (
    <div className={Styles.container}>
      {location.pathname === "/" ? 
     <span className={`flex--center ${Styles.imgContainer}`}
     onClick={logout}>
      { loading ? 
        <h2>Loading...</h2> :
        <img className={Styles.profileImg} src={profileImage} alt="Profile Pic" /> 
      }
     </span> 
      : null}
      <h1 className={Styles.header} style={headerStyle} >{headerText}</h1>
      <h1 className={Styles.home} 
      style={{display: showHome ? "" : "none"}} 
      onClick={()=> navigate("/")}
      >Home</h1>
        {children}
    </div>
  )
}

export default Layout