import { render, fireEvent } from "@testing-library/react-native"
import React from "react"
import TaskComponent from "../Components/TaskComponent"
import TaskCreationForm from "../Components/TaskCreationForm"
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry"
import { useContext } from "react"
import { AppContext } from "../Components/TasksContext"


describe(
'very easy test', ()=>{
    test('button text check', ()=>{
            const mockContext = {
            visible: true,
            setVisible: jest.fn(),
            tasks: [],
            setTasks: jest.fn(),
            };
        const { getByText } = render(<AppContext.Provider value={mockContext}>
            <TaskCreationForm/>
        </AppContext.Provider>)
        const getText = getByText("Save")
        expect(getText).toBeTruthy()
    })

    test('testing task saving', ()=>{
            const mockContext = {
            visible: true,
            setVisible: jest.fn(),
            tasks: [],
            setTasks: jest.fn(),
            };
        const { getByText, getByPlaceholderText, getByTestId } = render(<AppContext.Provider value={mockContext}>
            <TaskCreationForm/>
        </AppContext.Provider>)
        const getText = getByText("Save")
        const name = getByPlaceholderText("name")
        const description = getByPlaceholderText("description")
        const difficulty = getByTestId("levelSelector")
        fireEvent.changeText(name, "this is a test task")
        fireEvent.changeText(description, "this is a test description")
        fireEvent(difficulty, "valueChange", 'easy')
        fireEvent.press(getText)

        expect(getText).toBeTruthy()
        expect(mockContext.setTasks).toHaveBeenCalled()
    })

        test('testing task save failing', ()=>{
            const mockContext = {
            visible: true,
            setVisible: jest.fn(),
            tasks: [],
            setTasks: jest.fn(),
            };
        const { getByText, getByPlaceholderText, getByTestId } = render(<AppContext.Provider value={mockContext}>
            <TaskCreationForm/>
        </AppContext.Provider>)
        const getText = getByText("Save")
        const name = getByPlaceholderText("name")
        const description = getByPlaceholderText("description")
        const difficulty = getByTestId("levelSelector")
        fireEvent.changeText(name, "this is a test task")
        fireEvent.press(getText)
        expect(mockContext.setTasks).not.toHaveBeenCalled()

    })

    
}
)