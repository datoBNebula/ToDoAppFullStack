import { PaperProvider, Menu, Divider, Button } from 'react-native-paper'
import { View, StyleSheet, Alert } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from './TasksContext'
import { deleteTaskApi, UpdateTask  } from './api'
import TaskEditingForm from './TaskEditiingForm'

export default function PaperMenu({task}){
    const {tasks, setTasks, editVisible, setEditVisible, setEditingTask} = useContext(AppContext)
    const [visible, setVisible] = useState(false)
    const closeMenu = ()=>setVisible(false)
    const openMenu = ()=>setVisible(true)

    const changeStatus = async (taskId, status)=>{

                const editingTask = tasks.find(task=>task.id == taskId)
                editingTask.status = status
                const response = await UpdateTask(taskId, editingTask)
                setTasks(prev=>{
                    return prev.map(task=>task.id == taskId ? editingTask: task)
                })
                setEditVisible(false)
           


        setTasks(prev=>{
            return prev.map(task=>task.id == taskId ? {...task, status: status}: task )
        })
    }

        const deleteTask = async (taskId)=>{
                const response =  await deleteTaskApi(taskId)
                console.log(response)
        setTasks(tasks.filter(task=>task.id!=taskId))
    }

    const openDeleAlert = (taskId)=>{
        Alert.alert("Do you want to delete the task?",
                "", 
        [
            {text: 'Yes', onPress: ()=>{deleteTask(taskId)}},
            {text: 'No'}
        ])
        }


    const editTask = ()=>{
        setEditVisible(true)
        setEditingTask(task)
    }

    const styles = StyleSheet.create({
        item:{
            alignContent: 'center',
            width: 'fit-auto',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            overflow: 'scroll'
        },
        menu:{
             position: 'absolute',
             right: 0,
             backgroundColor: 'rgba(158, 126, 126, 1)',
             zIndex: 2,
             display: 'flex',
        }
    })

    return (
        <View
        style={styles.menu}>
            <Menu>
                
            </Menu>
    <Menu.Item titleStyle={{fontSize: 13, fontWeight: 800}} containerStyle={styles.item} leadingIcon="pencil" onPress={() => {editTask()}} title="Edit"  />
    <Menu.Item titleStyle={{fontSize: 13, fontWeight: 800}} containerStyle={styles.item} leadingIcon="delete" onPress={() => {openDeleAlert(task.id)}} title="Delete" />
        {task.status!='done' && 
        <Menu.Item  style={styles.item} leadingIcon="wrap" titleStyle={{fontSize: 13, fontWeight: 800}}
        onPress={() => {changeStatus(task.id, task.status.toLowerCase() == 'to do'? 'in-progress': 'done')}} 
        title={`Move to ${task.status == 'to do'? 'in-progress': 'done'}`} />  }
     

      </View>
    )

}