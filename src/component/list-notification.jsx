import { useTask } from "../context/task-context"
import { httpClient } from "../lib/http-client"

export const Listnotification = ({ setShowReq, showReq }) => {

    const { actionReq,setActionReq } = useTask()

    const handleRequest = async (action) => {
        try {
            if (action.action) {
                console.log(action)
                const updateaction = await httpClient.put('/rbac/tasks/actionupdate', { actions: action.action, resourceId: action.resourceId, email: action.requesterEmail })
                console.log('update action',updateaction.data)

                const removeNotification = await httpClient.delete(`/action/requests/${action._id}`)
                console.log('remove not',removeNotification.data)
                const remainingActions = actionReq.filter((req)=> req._id != action._id)
                setActionReq(remainingActions)  
            }

            if (!action.action) {
                console.log('request deny')
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="fixed inset-0 bg-opacity-0 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white flex flex-col justify-center gap-4 p-4">
                <div className="flex justify-end">
                    <svg onClick={() => setShowReq(!showReq)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:stroke-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                {
                    actionReq.map((action) => {
                        return (
                            <div key={action._id} className="bg-white flex justify-between rounded-2xl shadow-2xl p-2 gap-4">
                                <div className="flex justify-center items-center">
                                    <span>{action.requesterEmail} has requested for {action.action} action</span>
                                </div>
                                <div className="flex justify-center items-center gap-2">
                                    <div className="flex justify-center items-center bg-green rounded-2xl shadow-2xl">
                                        <button onClick={() => handleRequest(action)} className="text-white font-medium rounded-md bg-gradient-to-r from-green-500 to-indigo-900 p-2 shadow-2xl">Approve</button>
                                    </div>
                                    <div className="flex justify-center items-center bg-red">
                                        <button onClick={handleRequest} className="text-white font-medium rounded-md bg-gradient-to-r from-red-500 to-indigo-900 p-2 shadow-2xl">Deny</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}