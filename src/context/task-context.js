import { useContext, createContext } from "react";

export const TaskContext = createContext({
    tasks: [],
    sharedTasks: [],
    actionReq: [],
    addTask: () => { },
    deleteTask: () => { },
    modifyTask: () => { },
    shareTask: () => { },
    setSharedTasks: () => { },
    setActionReq: () => { }
})

export const useTask = () => {
    return useContext(TaskContext)
}

export const TaskProvider = TaskContext.Provider