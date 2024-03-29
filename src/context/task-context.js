import { useContext, createContext } from "react";

export const TaskContext = createContext({
    tasks : [],
    addTask: ()=>{},
    deleteTask : () =>{},
    modifyTask : ()=>{}
})

export const useTask = () => {
    return useContext(TaskContext)
}

export const TaskProvider = TaskContext.Provider