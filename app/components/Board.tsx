'use client';

import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useEffect } from "react";
import useBoardStore from "@/app/store/BoardStore";
import Column from "@/app/components/Column";

const Board = () => {
  const [board, getBoard, setBoardState] = useBoardStore((state) => [
    state.board,
    state.getBoard,
    state.setBoardState,
  ]);

  useEffect(() => {
    getBoard();
  }, [getBoard])

  const handleOnDragEnd = async (result: DropResult) => {
    const { destination, source, type } = result

    if (!destination) {
      return;
    }

    if (type === "column") {
      const entries = Array.from(board.columns.entries());
      const [removed] = entries.splice(source.index, 1);

      entries.splice(destination.index, 0, removed);

      const rearrangedColumns = new Map(entries);

      setBoardState({
        ...board,
        columns: rearrangedColumns,
      });
    } else {
      const columns = Array.from(board.columns);
      const startColIndex = columns[Number(source.droppableId)];
      const finishColIndex = columns[Number(destination.droppableId)];

      const startCol = {
        id: startColIndex[0],
        todos: startColIndex[1].todos
      }

      const finishCol = {
        id: finishColIndex[0],
        todos: finishColIndex[1].todos
      }

      if (!startCol || !finishCol) {
        return;
      }

      if (source.index === destination.index && startCol === finishCol) {
        return;
      }

      const newTodos = startCol.todos;
      const [todoMoved] = newTodos.splice(source.index, 1);

      if (startCol.id === finishCol.id) {
        newTodos.splice(destination.index, 0, todoMoved);

        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };

        const newColumns = new Map(board.columns);
        newColumns.set(startCol.id, newCol);

        setBoardState({
          ...board,
          columns: newColumns,
        })
      } else {
        const finishTodos = Array.from(finishCol.todos);
        finishTodos.splice(destination.index, 0, todoMoved);

        const newColumns = new Map(board.columns);
        const newCol = {
          id: startCol.id,
          todos: newTodos,
        };

        newColumns.set(startCol.id, newCol);
        newColumns.set(finishCol.id, {
          id: finishCol.id,
          todos: finishTodos,
        });


        setBoardState({
          ...board,
          columns: newColumns,
        });

        // Update in database
        try {
          await fetch(`https://goal-keeper.vercel.app/api/todos/${todoMoved.id}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              status: finishCol.id,
            }),
          });
        } catch (error) {
          try {
            await fetch(`https://goal-keeper.vercel.app/api/todos/${todoMoved.id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                status: finishCol.id,
              }),
            });
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="board" direction="horizontal" type="column">
        {
          (provided) => (
            <div
              className="grid grid-cols-1 md:grid-cols-3 gap-5 mx-5 2xl:gap-10 2xl:mx-10"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {
                Array.from(board.columns.entries()).map(([id, column], index) => (
                  <Column
                    key={id}
                    id={id}
                    todos={column.todos}
                    index={index}
                  />
                ))
              }
              { provided.placeholder }
            </div>
          )
        }
      </Droppable>
    </DragDropContext>
  );
}
export default Board;