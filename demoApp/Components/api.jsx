import axios from "axios"
import { jsx } from "react/jsx-runtime"

const tasksRootUrl = "http://localhost:8000/tasks/"

export const getAllTasks = async ()=>{
const response = await axios.get(tasksRootUrl, {
    headers:{
        'Content-Type': 'application/json'
    }
})
    .then(resp=>resp)
    .catch((e)=>console.log(e))

    return response

}

const getTask = async (taskId)=>{
    
}

export const postTask = async (task)=>{
    const response = await axios.post(tasksRootUrl, {
        name: task.name,
        description: task.description,
        status: task.status || 'to do',
        difficulty: task.difficulty?.toLowerCase() || 'easy'
})
    .then(resp=>resp)
    .catch((e)=>e)
    return response
}


export const deleteTaskApi = async (taskId)=>{
    const response = await axios.delete(tasksRootUrl + taskId, {
        headers:{"Content-Type": 'application/json'}
    }).catch(e=>e)
    return response
}


export const UpdateTask = async (taskId, task)=>{
    const response = await axios.put(tasksRootUrl + taskId, {
         name: task.name, description: task.description, difficulty: task.difficulty.toLowerCase(), status: task.status
    }).then(resp=>resp).catch(e=>e)
    return response
    
}



export const FetchAiSuggestions = async(tasks)=>{
    let baseApiUrl = "http://localhost:8000/tasks/make/suggestions?tasks=";
    let taskNames = tasks.map(task=>task.name.split(' ').join('%20')).join(',')
    let completeUrl = baseApiUrl + taskNames
    const response = await axios.get(completeUrl, {
    headers:{
        'Content-Type': 'application/json'
    }
}).then(resp=>resp).catch(e=>e)
console.log(tasks)
console.log(response)
return response
}