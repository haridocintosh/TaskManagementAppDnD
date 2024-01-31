import React, { useState } from 'react';
import './CreateTaskStyle.css';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

function CreateTask({tasks,setTasks}) {
    const [task, setTask] = useState({
        id:"",
        name:"",
        status:"added"
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if(task?.name?.length < 3) {
            return toast.error("Task field should more than 3 characters");
        }
        if(task?.name?.length > 100) {
            return toast.error("Task field should not be more than 100 characters");
        }
        setTasks((prev) => {
            console.log(prev);
            if(prev){
                const list = [...prev, task]
                localStorage.setItem("tasks",JSON.stringify(list))
                return list;
            }else{
                const list = [task]
                localStorage.setItem("tasks",JSON.stringify(list))
                return list;
            }
        })
        toast.success("Task added successfully");
        setTask({
            id:"",
            name:"",
            status:"added"
        })
    }
  return (
    <form className='form' onSubmit={handleSubmit}>
        <input 
            type='text' 
            className='inputField'
            value={task.name}
            onChange={(e) => setTask({...task, id:uuidv4(), name:e.target.value})}
        />
        <button className='submitBtn' >ADD</button>
    </form>
  )
}

export default CreateTask