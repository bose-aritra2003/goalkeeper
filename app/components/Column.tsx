'use client';

import { Draggable, Droppable } from "react-beautiful-dnd";
import { TypedColumn } from "@/app/types";
import { Todo } from "@prisma/client";
import { FC } from "react";
import { HiPlusCircle } from "react-icons/hi2";
import TodoCard from "@/app/components/TodoCard";
import useBoardStore from "@/app/store/BoardStore";
import useModalStore from "@/app/store/ModalStore";

interface ColumnProps {
  id: TypedColumn,
  todos: Todo[],
  index: number
}

const idToColumnText: { [key in TypedColumn]: string } = {
  "todo": "To Do",
  "in_progress": "In Progress",
  "done": "Done"
}

const Column: FC<ColumnProps> = ({id, todos, index}) => {
  const [searchString, setNewTaskType] = useBoardStore((state) => [
    state.searchString,
    state.setNewTaskType
  ]);
  const openModal = useModalStore((state) => state.openModal);

  const handleAddTodo = () => {
    setNewTaskType(id);
    openModal();
  }

  return (
    <Draggable draggableId={id!} index={index}>
      {
        (provided) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Droppable droppableId={index.toString()} type="card">
              {
                (provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`
                      p-3 rounded-2xl shadow-lg
                      ${snapshot.isDraggingOver ? 'bg-green-200/75' : 'bg-white/50'}
                    `}
                  >
                    <h2 className="flex justify-between font-bold items-center text-xl">
                      <p className="text-blue-950">{ idToColumnText[id] }</p>
                      <span className="flex items-center justify-center text-blue-600 bg-blue-200 rounded-full px-2.5 py-1 h-fit w-fit text-sm font-normal">
                        {
                          !searchString ? todos.length : todos.filter((todo) => todo.title.toLowerCase().includes(searchString.toLowerCase())).length
                        }
                      </span>
                    </h2>

                    <div className="space-y-2">
                      {
                        todos.map((todo, index) => {
                          if (searchString && !todo.title.toLowerCase().includes(searchString.toLowerCase())) {
                            return null;
                          }
                          return(
                            <Draggable draggableId={todo.id} index={index} key={todo.id}>
                              {
                                (provided) => (
                                  <TodoCard
                                    todo={todo}
                                    index={index}
                                    id={id}
                                    innerRef={provided.innerRef}
                                    draggableProps={provided.draggableProps}
                                    dragHandleProps={provided.dragHandleProps}
                                  />
                                )
                              }
                            </Draggable>
                          )
                        })
                      }

                      { provided.placeholder }

                      <div className="flex items-end justify-end pt-2">
                        <button
                          onClick={handleAddTodo}
                          className="text-green-500 hover:text-green-600 transition-all ease-in-out"
                        >
                          <HiPlusCircle className="h-10 w-10"/>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              }
            </Droppable>
          </div>
        )
      }
    </Draggable>
  )
}
export default Column;