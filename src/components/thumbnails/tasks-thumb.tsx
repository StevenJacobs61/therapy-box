import React, { useEffect, useState } from 'react'
import { auth, getUserTasks } from '../../config/firebase'
import Styles from './thumbnails.module.css'
import { Task } from '../../interfaces/tasks'

const TasksThumb = () => {
  const [tasksList, setTasksList] = useState<Task[]>([])

const getTasks = async () =>{
  try {
  const collection = await getUserTasks(auth.currentUser?.uid);
  setTasksList(collection.slice(0, 3))
} catch (error) {
  console.error(error)
}
}
useEffect(()=>{
  if(auth.currentUser){
    getTasks();
  }
}, [])

  return (<>
    {tasksList.length < 1 ? <h1 className={Styles.noDataHeader}>No tasks currently</h1> : 
  <div className={Styles.tasksContainer}>
   { tasksList?.map((task, index) => 
    <div key={index} className={Styles.taskContainer}>
      <h2 className={Styles.taskText}>{task.taskQuestion}</h2>
      <span className={`box--task ${Styles.taskBox}`}>
      {task.complete ? <p className={Styles.tick}>&#x2714;</p>: ""}
      </span>
    </div>
    )}
  </div>
}</>
  )
}

export default TasksThumb