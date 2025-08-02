import React, { createContext, useState, useEffect} from "react";
export const AppContext = createContext();
import { getAllTasks, FetchAiSuggestions } from "../Components/api";

const AppProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [tasks, setTasks] = useState([])
  const [taskId, setTaskId] = useState(0)
  const [openMenu, setOpenMenu] = useState(false)
  const [editVisible, setEditVisible] = useState(false)
  const [suggestions, setSuggestions] = useState(false)

  useEffect(()=>{
    const fetchTasks = async ()=>{
      const response = await getAllTasks()
      console.log(response.data)
      setTasks(response.data)
    }

    const fetchSuggestions = async()=>{
      const response = await FetchAiSuggestions(tasks.slice(-6, -1))
      setSuggestions(response.data.tasks)
      console.log(response)
    }
    fetchTasks().catch(e=>console.log(e))
    fetchSuggestions().catch(e=>console.log(e))
  }, [])
//   const [theme, setTheme] = useState("light");

  return (
    <AppContext.Provider value={{
       visible, setVisible, tasks, setTasks, taskId, setTaskId, openMenu, setOpenMenu, 
       editVisible, setEditVisible, suggestions, setSuggestions
       }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;