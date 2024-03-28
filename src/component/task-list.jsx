import Sharedtask from "./shared-task"
import Usertask from "./user-task"

const Tasklist = () => {

    return (
        <div className="w-full flex">
            <Usertask />
            <Sharedtask />    
        </div>
    )
}

export default Tasklist