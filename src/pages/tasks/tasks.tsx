import React, { useEffect, useState } from 'react'
import Styles from './tasks.module.css'
import addIcon from "../../images/Plus_button.png"
import { auth, addTaskToUser, getUserTasks, toggleTaskComplete, deleteTask } from '../../config/firebase'

type Task = {
  taskQuestion: string,
  complete: Boolean,
  id: string,
};

const Tasks = () => {
  const [tasksList, setTasksList] = useState<Task[]>([])
  const [showAdd, setShowAdd] = useState<Boolean>()
  const [newTask, setNewTask] = useState<string>()

const getTasks = async () =>{
  try {
  const collection = await getUserTasks(auth.currentUser?.uid);
  setTasksList(collection)
} catch (error) {
  console.error(error)
}
}

const handleAdd = async () => {
  const taskObject = {
    id:  new Date().getTime().toString(),
    taskQuestion: newTask,
    complete: false,
  }
  if(showAdd){
    try {
      await addTaskToUser(auth.currentUser?.uid, taskObject)
      alert("Task added")
      setTasksList((prev:Array<any>) => [...prev, taskObject])
    } catch (error) {
      console.error(error)
    }
    setShowAdd(false)
  }else {
    setShowAdd(true)
  }
}

const handleToggleComplete = async (task:Task) => {
  let uid = auth.currentUser?.uid;
  try {
    await toggleTaskComplete(uid, task.id);
    setTasksList((prevTasksList) =>
        prevTasksList.map((item) => {
          if (item.id === task.id) {
            return {
              ...item,
              complete: !item.complete,
            };
          }
          return item;
        })
      );
  } catch (error) {
    console.error(error)
  }
}
const handleTaskDoubleClick = async (task: Task) => {
  let uid = auth.currentUser?.uid;
  try {
    await deleteTask(uid, task.id);
    setTasksList((prevTasksList) =>
      prevTasksList.filter((item) => item.id !== task.id)
    );
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  if(auth.currentUser){
    getTasks();
  }
}, [])

useEffect(() =>{
  getTasks()
}, [deleteTask])


  return (
    <div className={`flex--col ${Styles.section}`}>
         <ul>{tasksList?.map((task, index)=>
            <li key={index}>
              <div className={Styles.taskContainer}>
                <h2 className={Styles.taskText}>{task.taskQuestion}</h2>
                <span className={`box--task flex--center ${Styles.taskBox}`}
                onClick={()=>handleToggleComplete(task)}
                onDoubleClick={() => handleTaskDoubleClick(task)}>
                  {task.complete ? <p className={Styles.tick}>&#x2714;</p>: ""}
                  </span>
              </div>
            </li>
         )}

         </ul>
            <div className={Styles.addContainer}>
                <img src={addIcon} alt="add" className={Styles.icon} 
                onClick={handleAdd}
                style={{border: showAdd ? "2px solid var(--color-yellow)" : '',
                borderRadius: "50px", padding: '1rem'}}/>
            </div>
            {showAdd ?
            <div>
              <div className={Styles.taskContainer}>
                <input className={`input ${Styles.taskText}`} 
                placeholder='Enter new task and hit the add button again to submit...'
                onChange={(e)=>setNewTask(e.target.value)}
                onKeyDown={(e)=>{if(e.key === "Enter"){handleAdd()}}}/>
              </div>
            </div>
            : null}
    </div>
  )
}

export default Tasks