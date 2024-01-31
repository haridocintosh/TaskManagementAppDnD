import { useEffect, useState } from 'react';
import './App.css';
import CreateTask from './components/CreateTask/CreateTask';
import ListTask from './components/ListTask/ListTask';
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("tasks")))
  },[])
  
  console.log(tasks);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Toaster/>
        <div className="container">
          <CreateTask tasks={tasks} setTasks={setTasks} />
          <ListTask tasks={tasks} setTasks={setTasks} />
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
