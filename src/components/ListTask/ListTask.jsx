import React, { useEffect, useState } from 'react'
import "./ListTaskStyle.css"
import Section from './Section/Section';


function ListTask({tasks,setTasks}) {
    const [added,setAdded]=useState([]);
    const [started,setStarted]=useState([]);
    const [completed,setCompleted]=useState([]);

    useEffect(()=>{
        const fadded = tasks?.filter(task => task.status === "added");
        const fstarted = tasks?.filter(task => task.status === "started");
        const fcompleted = tasks?.filter(task => task.status === "completed");

        setAdded(fadded)
        setStarted(fstarted)
        setCompleted(fcompleted)
    },[tasks])

    const statuses = ["added","started","completed"];

  return (
    <div className='statusContainer'>
        {statuses.map((status,index) =>{
            return(
                <Section 
                    key={index} 
                    status={status}
                    tasks={tasks}
                    setTasks={setTasks}
                    added={added}
                    started={started}
                    completed={completed}
                />
            )
        })}
    </div>
  )
}

export default ListTask;