import { View, Text, Button, TextInput, StyleSheet } from "react-native"
import { useContext, useState } from "react"
import { AppContext } from "./TasksContext"
import { UpdateTask } from "./api"
export default function TaskEditingForm({task}){

    const {tasks, setTasks, editVisible, setEditVisible} = useContext(AppContext)
    const [newName, setNewName] = useState(task.name)
    const [newDescription, setNewDescription] = useState(task.description)
    const [newDifficulty, setNewDifficulty] = useState(task.difficulty)

    const editItem = async (taskId)=>{
        const editingTask = tasks.find(task=>task.id == taskId)
        if (newName) editingTask.name = newName
        if (newDescription) editingTask.description = newDescription
        if (newDifficulty) editingTask.difficulty = newDifficulty
        const response = await UpdateTask(taskId, editingTask)
        console.log(response)
        setTasks(prev=>{
            return prev.map(task=>task.id == taskId ? editingTask: task)
        })
        setEditVisible(false)
    }

    return <View style={styles.mainContainer}>
        <View style={styles.inputs}>
            <TextInput style={styles.input} onChangeText={e=>setNewName(e)} value={newName}/>
            <TextInput style={styles.input} onChangeText={e=>setNewDescription(e)} value={newDescription}/>
            <TextInput style={styles.input} onChangeText={e=>setNewDifficulty(e)} value={newDifficulty}/>
        </View>
        <View style={styles.buttonsView}>
            <Button onPress={()=>editItem(task.id)} title="Edit"/>
            <Button  onPress={()=>setEditVisible(false)} title="Close"/>
        </View>

    </View>
}

const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: "gold",
      width: 300,
      height: 300,
      padding: 10,
      display: "flex",
      justifyContent: 'space-between',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform:[
        {translateX: -150},
        {translateY: -150}
      ],
    },

    inputs:{
      display: 'flex',
      gap: 10,
    },
    input:{
      borderBlockColor: 'rgba(196, 86, 2, 1)',
      // borderColor: 'rgba(46, 43, 40, 1)',
      borderWidth: 2,
      backgroundColor: 'rgba(196, 86, 2, 1)',
      borderRadius: 15,
      borderBottomColor: 'rgba(215, 122, 51, 1)',
      fontWeight: 500,
      color: 'rgb(57, 31, 10)',
    },
    buttonsView: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'flex-end',
      gap: 10
    } 
  });