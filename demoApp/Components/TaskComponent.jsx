import { useState } from "react";
import { Text, View, Button, StyleSheet } from "react-native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import PaperMenu from "./PaperMenu";


export default function TaskComponent({task }){

    const [visible, setVisible] = useState(false)

        const styles = StyleSheet.create({
            task:{
                    display: 'flex', 
                    flexDirection: 'row', 
                    width: '100%', 
                    padding: 10, 
                    justifyContent: 'space-between',
                     backgroundColor: 'rgba(149, 185, 222, 1)'
            },
            text: { 
                color: 'black',
                fontSize: 25,
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center'
             },
             icons:{
                    display: 'flex',
                    flexDirection: 'row'
             }
        })

return (
    <View style={styles.task}>
        <Text style={styles.text}>{task.name}</Text>
        <View style={styles.icons}>
            {/* <AntDesign onPress={()=>{openDeleAlert(task.id)}} name="edit" size={24} color="rgba(23, 45, 56, 1)" />
            <AntDesign onPress={()=>{openDeleAlert(task.id)}} name="minuscircle" size={24} color="red" /> */}
            <Entypo style={{zIndex: 3}} name="dots-three-vertical" size={24} color="black" onPress={()=>{setVisible(prev=>!prev)}} />
        </View>
               { visible && <PaperMenu task={task}/>  }       
    </View>
)


}