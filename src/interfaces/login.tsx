export interface ILogin{
    setNewUser: React.Dispatch<React.SetStateAction<Boolean>>,
    newUser: Boolean,    
  }
 export interface IUser {
    newUser: Boolean,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setPassword: React.Dispatch<React.SetStateAction<string>>,
    password: string,
    setEmail: React.Dispatch<React.SetStateAction<string>>,
    setConfirm: React.Dispatch<React.SetStateAction<string>>,
}