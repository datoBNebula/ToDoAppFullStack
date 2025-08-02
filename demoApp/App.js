import AppProvider from './Components/TasksContext';
import HomePage from './app/HomePage';



export default function App() {
  return (
      <AppProvider>
        <HomePage/>
      </AppProvider>
  )
};
