import React from 'react'
import "./SectionStyle.css"
import { useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import Task from './Task/Task';

const Section = ({status,tasks, setTasks, added, started,completed}) => {
    let text = "added";
    let bg = "#9051FF";
    let taskToMap = added;
    
    if(status === "started"){
        text = "Started";
        bg = "#08B700";
        taskToMap = started;
    }
    if(status === "completed"){
        text = "Completed";
        bg = "#B70043";
        taskToMap = completed;
    }

    let HeaderStyle = {
        height: '40px',
        width: '250px',
        display: 'flex',
        justifyContent:'space-between',
        padding:'0 10px',
        alignItems: 'center',
        textAlign: 'center',
        backgroundColor:bg,
        color: '#fff',
        borderRadius: '5px',
    }

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'Task',
        drop:(item) => addItemToSection(item.id),
        collect: (monitor) => ({
          isOver: !!monitor.isOver()
        })
    }));

    const addItemToSection = (id) =>{
        setTasks((prev) =>{
            const modified = prev.map((task) =>{
                if(task.id === id){
                    return {...task,status:status}
                }
                return task;
            });
            localStorage.setItem("tasks",JSON.stringify(modified))
            toast("Task Status Changed", { icon: "😃"})
            return modified;
        })
    }
    
    return(
        <div className='TasksConatiner' ref={drop} 
            style={{backgroundColor:isOver? '#f2f2f2' : ""}}>
            <div style={HeaderStyle}>
                {text.toUpperCase()}
                {taskToMap?.length > 0 && <div className='taskCount'>{taskToMap?.length}</div>}
            </div>
            {taskToMap?.length > 0 && taskToMap?.map((task) =>{
                return(
                    <Task 
                        task={task} 
                        key={task.id} 
                        tasks={tasks}
                        setTasks={setTasks}
                    />
                )
            })}
        </div>
    )
}

export default Section