import { useState } from "react";
import { View, StyleSheet, Button, Text, ScrollView, TextInput, Pressable } from "react-native";
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
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: 'rgba(162, 178, 181, 1)'
  },

  tasksQuantities:{
  backgroundColor: 'rgba(213, 230, 233, 1)',
  padding: 20,
  borderColor: 'rgb(125, 57, 23)',
  borderWidth: 2,
  borderRadius: 20,
  },
  texts: {
      fontSize: 30,
      fontWeight: 600
  },

  suggestionTexts:{
    maxWidth:200,
    fontSize: 15,
    fontWeight: 600,
    color: 'rgb(12, 12, 23)',
    padding: 10,
  }
  


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
    setSuggestions(prev=>prev.filter(s=>s.id != suggestion.id))

  }




useEffect(()=>{
    console.log('taskssssssssssssssssssss', tasks)
      if (tasks.length>=3) setSuggestionsBtn(true)
}, [tasks])

    return  (
    <SafeAreaView style={[styles.container]}>
      <View style={ styles.tasksQuantities }>
        <View style={{ display: 'flex', gap: 10 }}>
           <Text style={[styles.texts, {color: 'rgba(67, 59, 59, 1)'}]}>ALL - {allNumber}</Text>
          <View><Text style={[styles.texts, {color: 'rgba(139, 135, 135, 1)'}]} >TO DO - {toDoNumber}</Text></View>
          <View><Text style={[styles.texts, {color: 'rgba(190, 121, 17, 1)'}]} >IN-PROGRESS - {inProgressNumber}</Text></View>
          <View><Text style={[styles.texts, {color: 'rgba(29, 157, 27, 1)'}]} >DONE - {doneNumber}</Text></View>
        </View>

      </View>
              
              { (suggestions && showSuggestions) && <ScrollView scrollEnabled={true} contentContainerStyle={{width: 300,  display: 'flex', gap: 10, 
                              backgroundColor: 'rgba(187, 177, 169, 1)', padding: suggestions.length>0? 10: 0, borderWidth: suggestions.length>0? 2: 0, 
                              borderColor: 'rgba(113, 110, 110, 1)', borderRadius: 15  }}>
                          {suggestions.map(suggestion=>{
                            return <View key={suggestion.id} style={{ padding: 10, backgroundColor: 'rgba(149, 146, 140, 1)', display: 'flex', flexDirection: 'row', 
                            justifyContent: 'space-between', padding: 5, borderRadius: 20}}>
                              <Text style={ styles.suggestionTexts }>{suggestion.name}</Text>
                              <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Entypo onPress={()=>addHandler(suggestion)} size={28} name="plus" color={'rgb(45, 34, 123)'} />
                                <Entypo onPress={()=>setSuggestions(prev=>prev.filter(s=>s.id != suggestion.id))} size={28} name="minus" color={'rgb(45, 34, 123)'} />
  
                              </View>
                             
                            </View>
                          })}
                          </ScrollView>
                }

  { visible && <TaskCreationForm></TaskCreationForm>}
  <View style= {{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 30, alignItems: 'center' }}>
              
              { showSuggestionsBtn && <Pressable onPress={()=>setShowsuggestions(true)} style={{ backgroundColor: 'rgba(108, 144, 144, 1)', padding: 15, borderRadius: 15 }}>
                <Text style={{ fontSize: 20, fontWeight: 600, color: 'rgb(84, 77, 51)' }}>AI Suggestion</Text></Pressable>
               }

    <Entypo style={{ marginLeft: 'auto' }} onPress={()=>{setVisible(true)}} size={38} name="add-to-list" color={'rgb(45, 34, 123)'} />
    
                
  </View>

            
          </SafeAreaView> 
    )
}