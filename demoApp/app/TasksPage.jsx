import React from "react";
import { View,Text, Button, TextInput, ScrollView , Alert, StyleSheet, Touchable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useState } from "react";
import { AppContext } from "../Components/TasksContext";
import { AntDesign } from "@expo/vector-icons";
import TaskComponent from "../Components/TaskComponent";
import TaskEditingForm from "../Components/TaskEditiingForm";


export default function TasksPage(){
    const {tasks, setTasks, editVisible, editingTask} = useContext(AppContext)
    const [filterStatus, setFilterStatus] = useState('to do')

    const filteredTasks = tasks.filter(task=>task.status==filterStatus)

    const styles = StyleSheet.create({
        task:{
                display: 'flex', 
                flexDirection: 'row', 
                width: '100%', 
                padding: 5, 
                justifyContent: 'space-between',
                 backgroundColor: 'rgba(223, 165, 66, 1)'
        },
        text: { 
            color: 'black'
         },
         tasksContainer: { 
            paddingVertical: 5,
            paddingHorizontal: 6,
            backgroundColor: 'rgba(215, 215, 214, 1)', 
            width: 300, 
            height: 400, 
            alignItems: 'center', 
            justifyContent: 'center',
            marginTop: 60,
         },
         icons:{
                display: 'flex',
                flexDirection: 'row'
         },
         statusViews:{
                flex: 1, 
                alignContent:'center', 
                paddingVertical: 5, 
                paddingHorizontal: 4
         }
    })

    return <SafeAreaView style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',  margin: 'auto', backgroundColor: 'rgba(162, 178, 181, 1)', height: '100%' }}>

        <View style={styles.tasksContainer}>
                        {filteredTasks.length> 0?(<ScrollView scrollEnabled={true} contentContainerStyle={{width: 300,  display: 'flex', gap: 10 }}>
                          {filteredTasks.map((task)=>{
                      return <TaskComponent key={task.id} task={task}/>
                        })}
                        </ScrollView>): <Text style={{fontSize: 30, fontWeight: 600, color: 'darkbrown', textShadowRadius: 5, textShadowColor: 'pink' }}>There are no tasks</Text>}
             
              </View>
                      <View style={{ display: 'flex', flexDirection: 'row', width: '100%', gap: 5 }}>
            <View style={[styles.statusViews, {backgroundColor: 'rgba(174, 169, 161, 1)'}]}><Text onPress={()=>{setFilterStatus('to do')}} style={{textAlign: 'center'}}>To Do</Text></View>
            <View style={[styles.statusViews, {backgroundColor: 'rgba(215, 138, 6, 1)'}]}><Text onPress={()=>{setFilterStatus('in-progress')}} style={{textAlign: 'center'}}>In Progress</Text></View>
            <View style={[styles.statusViews, {backgroundColor: 'rgba(56, 172, 48, 1)'}]}><Text onPress={()=>{setFilterStatus('done')}} style={{textAlign: 'center'}}>Done</Text></View>
        </View>

 {editVisible && <TaskEditingForm task={editingTask}/>}

    </SafeAreaView>

}