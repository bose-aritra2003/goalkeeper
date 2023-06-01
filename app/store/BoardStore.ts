import { create } from "zustand";
import { Board, Column, TypedColumn } from "@/app/types";
import getTodosGroupedByColumn from "@/app/actions/getTodosGroupedByColumn";
import { Todo } from "@prisma/client";

interface BoardState {
  board: Board;
  getBoard: () => void;
  setBoardState: (board: Board) => void;

  newTaskInput: string;
  setNewTaskInput: (searchString: string) => void;

  newTaskType: TypedColumn;
  setNewTaskType: (columnId: TypedColumn) => void;

  image: string | null;
  setImage: (image: string | null) => void;

  searchString: string;
  setSearchString: (searchString: string) => void;

  addTask: (todo: string, columnId: TypedColumn, image: string | null) => void;
  deleteTask: (taskIndex: number, todo: Todo, id: TypedColumn) => void;
}

const useBoardStore = create<BoardState>()((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>()
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setBoardState: (board) => set({ board }),

  newTaskInput: "",
  setNewTaskInput: (input: string) => set({ newTaskInput: input }),

  newTaskType: "todo",
  setNewTaskType: (columnId: TypedColumn) => set({ newTaskType: columnId }),

  image: null,
  setImage: (image: string | null) => set({ image }),

  searchString: "",
  setSearchString: (searchString) => set({ searchString }),

  addTask: async (todo: string, columnId: TypedColumn, image: string | null) => {
    const newTodo = {
      id: Math.random().toString(36).substring(7),
      title: todo,
      status: columnId,
      image: image,
      createdAt: new Date(),
      userId: Math.random().toString(36).substring(7),
    }

    set((state) => {
      const newColumns = new Map(state.board.columns);
      const column = newColumns.get(columnId);

      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo]
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }

      return { board: { columns: newColumns } };
    });

    await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newTodo.title,
        status: newTodo.status,
        image: newTodo.image,
      })
    });

    set({ newTaskInput: "" });
  },

  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);

    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });

    await fetch(`/api/todos/${todo.id}`, {
      method: "DELETE",
    });
  },
}));

export default useBoardStore;