import { useContext, createContext } from "react";

export const TaskContext = createContext({
    tasks: [],
    sharedTasks: [],
    addTask: () => { },
    deleteTask: () => { },
    modifyTask: () => { },
    shareTask: () => { },
    setSharedTasks: () => { }
})

export const useTask = () => {
    return useContext(TaskContext)
}

export const TaskProvider = TaskContext.Provider