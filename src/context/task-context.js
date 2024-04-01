import { useContext, createContext } from "react";

export const TaskContext = createContext({
    tasks: [],
    sharedTasks: [],
    addTask: () => { },
    deleteTask: () => { },
    modifyTask: () => { },
    shareTask: () => { }
})

export const useTask = () => {
    return useContext(TaskContext)
}

export const TaskProvider = TaskContext.Provider