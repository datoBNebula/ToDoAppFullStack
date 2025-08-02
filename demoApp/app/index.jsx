import { useState } from "react";
import { View, StyleSheet, Button, Text, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect } from "react";
import { AppContext } from "../Components/TasksContext";
import TaskCreationForm from "../Components/TaskCreationForm";
import { Entypo} from "@expo/vector-icons";
import { FetchAiSuggestions, getAllTasks } from "../Components/api";
import { postTask } from "../Components/api";


export default function HomePage(){
    const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  tasksQuantities:{
  backgroundColor: 'rgba(213, 230, 233, 1)',
  padding: 20,
  borderBlockColor: 'rgb(125, 57, 23)',
  borderWidth: 2,
  borderRadius: 20
  },
  

})
const {visible, setVisible, tasks, setTasks, suggestions, setSuggestions} = useContext(AppContext)
const allNumber = tasks.length
const toDoNumber = tasks.filter(task=>task.status == 'to do').length
const inProgressNumber = tasks.filter(task=>task.status == 'in-progress').length
const doneNumber = tasks.filter(task=>task.status == 'done').length

// ai suggestions
const [showSuggestions, setShowsuggestions] = useState(false)
const [showSuggestionsBtn, setSuggestionsBtn] = useState(false)


const addTask = async (suggestion)=>{
const task = {
        name: suggestion.name,
        description: suggestion.description,
        difficulty: suggestion.difficulty,
        status: suggestion.status || 'to do'
    }
     await postTask(task)
  }

  const addHandler = (suggestion)=>{
    addTask(suggestion)
    setTasks(prev=>[...prev, suggestion])
  }




useEffect(()=>{
    console.log('taskssssssssssssssssssss', tasks)
      if (tasks.length>=3) setSuggestionsBtn(true)
}, [tasks])

    return  (
    <SafeAreaView style={[styles.container]}>
      <View style={ styles.tasksQuantities }>
        <View>
          <Text>ALL - {allNumber}</Text>
        </View>
        <View>
          <View><Text>TO DO - {toDoNumber}</Text></View>
          <View><Text>IN-PROGRESS - {inProgressNumber}</Text></View>
          <View><Text>DONE - {doneNumber}</Text></View>
        </View>

      </View>

        <Entypo onPress={()=>{setVisible(true)}} size={28} name="add-to-list" color={'rgb(45, 34, 123)'} />
              
              { visible && <TaskCreationForm></TaskCreationForm>}
              { (suggestions && showSuggestions) && <View style={{display: 'flex', flexDirection: 'column', backgroundColor: 'rgba(187, 153, 5, 1)'}}>
                          {suggestions.map(suggestion=>{
                            return <View key={suggestion.id}>
                              <Text>{suggestion.name}</Text>
                              <Text>{suggestion.description}</Text>
                              <Text>{suggestion.difficulty}</Text>
                              <Button onPress={()=>addHandler(suggestion)} title='add the suggestion'/>
                              <Button onPress={()=>setSuggestions(prev=>prev.filter(s=>s.id != suggestion.id))} title='remove the suggestion'/>
                            </View>
                          })}
                          </View>
                }

              { showSuggestionsBtn && <Button onPress={()=>setShowsuggestions(true)} title="AI Suggestion"/>}
    
    
                
            
          </SafeAreaView> 
    )
}