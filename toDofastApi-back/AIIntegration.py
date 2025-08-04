import os
from langchain.chat_models import init_chat_model
from langchain_core.messages import HumanMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from pydantic import BaseModel, Field, AfterValidator, ValidationError
from typing import List, Dict, Annotated
from enums import Difficulty
from typing_extensions import TypedDict



os.environ["GROQ_API_KEY"] = os.getenv("GROQ_API_KEY")
model = init_chat_model("llama3-8b-8192", model_provider="groq")


system_message = "translate the following text in {language}"

prompt_template = ChatPromptTemplate.from_messages(
    [("system", system_message), ("user", "{text}")]
)

# prompt = prompt_template.invoke({"language": "georgian", "text": "freeze"})
# print(model.invoke(prompt))

difficulties = {"easy", "medium", "hard", "very hard"}


def validate_description(description: str):
    if len(description.split()) < 10:
        raise ValueError("description error")
    return description


def validate_difficulty(difficulty: str):
    if difficulty not in difficulties:
        raise ValueError("difficulty error")
    return difficulty


def validate_list(tasks_list):
    if len(tasks_list) < 3:
        raise ValueError("list length error")
    return tasks_list


class ToDoType(BaseModel):
    id: int
    name: str
    description: str = Field(description="Must be more than 10 words")
    difficulty: Annotated[str, AfterValidator(validate_difficulty)] = Field(description="Only ['easy', 'medium', 'hard'] use lowerCase values!!!")


class ToDoPrompt(BaseModel):
    tasks: Annotated[List[ToDoType], AfterValidator(validate_list)] = Field("Must be at least 5 element array")







def suggest_tasks(tasks: list):
    model = init_chat_model("llama3-8b-8192", model_provider="groq")
    model = model.with_structured_output(ToDoPrompt)
    my_prompt = [
        SystemMessage("""Always return an output in this dict format.
        Suggest user different, funny tasks that be interesting and challenging for him/her.
        Do not recommend input tasks, only similar to the themes!"""),
        HumanMessage('\n'.join(tasks))

    ]
    output = model.invoke(my_prompt)
    return output
