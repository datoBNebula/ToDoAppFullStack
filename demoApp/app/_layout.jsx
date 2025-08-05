import { Stack, Tabs } from "expo-router";
import AppProvider from "../Components/TasksContext";
import { useRouter } from "expo-router";
import { Button, View, StyleSheet, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";



export default function RootLayout(){

    const router = useRouter()
    return (
    <AppProvider>
          <Tabs screenOptions={{
    tabBarActiveTintColor: 'darkred',
    // tabBarActiveBackgroundColor: 'yellow' ,
    // tabBarInactiveBackgroundColor: 'white',
    // tabBarInactiveTintColor: 'yellow',
    tabBarStyle: {
        backgroundColor:'rgba(116, 126, 126, 1)',
          
    },
    headerShown: false,
    
    tabBarIconStyle:{
        // backgroundColor: 'green'
    }
  }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <AntDesign size={28} name="home" color={'rgba(56, 53, 53, 1)'} />,
        }}
      />

      <Tabs.Screen
        name="TasksPage"
        options={{
          title: 'tasks',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name="tasks" color={'rgba(56, 53, 53, 1)'} />,
        }}
      />

    </Tabs>
        </AppProvider>
    )
}

const style = StyleSheet.create({
    navigation:{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: 20,
        backgroundColor: 'gold',
        marginTop: 40
    }
})