import React, { useEffect, useState } from 'react'
import { auth, getUserTasks } from '../config/firebase'
import { Task } from '../interfaces/tasks'

const useTasks = () => {
const [tasksList, setTasksList] = useState<Task[]>([])

const getTasks = async () =>{
  try {
  const collection = await getUserTasks(auth.currentUser?.uid);
  setTasksList(collection)
} catch (error) {
  console.error(error)
}
}
useEffect(() => {
  if(auth.currentUser){
    getTasks();
  }
}, [])

  return {tasksList} 
  
}

export default useTasks