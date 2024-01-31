import React from 'react';
import { useDrag } from 'react-dnd';
import './TaskStyle.css'
import { IoMdRemoveCircleOutline } from "react-icons/io";
import toast from 'react-hot-toast';


const Task = ({task,setTasks,tasks}) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'Task',
        item:{id:task.id},
        collect: (monitor) => ({
          isDragging: !!monitor.isDragging()
        })
    }))

    const handleRemove = (id) => {
        const taskRemoved = tasks?.filter((data) => data.id !== id);
        localStorage.setItem("tasks",JSON.stringify(taskRemoved))
        setTasks(taskRemoved);
        toast("Task Removed", { icon: "😱"})
    }
  return (
    <div ref={drag} className='singleTask' style={{ opacity:isDragging?0.3:1 }}>
        <p>{task.name}</p>
        <button onClick={()=> handleRemove(task.id)}className='removeBtn' >
            <IoMdRemoveCircleOutline style={{color: 'black', fontSize: '20px',backgroundColor:'transparent'}}/>
        </button>
    </div>
  )
}

export default Task