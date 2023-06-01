import { Board, Column, TypedColumn } from "@/app/types";
import { Todo } from "@prisma/client";

const getTodosGroupedByColumn = async () => {
  const res = await fetch('http://localhost:3000/api/todos', {
    cache: "no-store"
  });
  const { todos }: { todos: Todo[] } = await res.json();

  const columns = todos.reduce((acc, todo) => {
    if (!acc.get(todo.status)) {
      acc.set(todo.status, {
        id: todo.status,
        todos: [],
      });
    }
    acc.get(todo.status)?.todos.push(todo);
    return acc;
  }, new Map<TypedColumn, Column>);

  const columnTypes: TypedColumn[] = ["todo", "in_progress", "done"];

  for (const columnType of columnTypes) {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        id: columnType,
        todos: [],
      });
    }
  }

  const sortedColumns = new Map(
    Array.from(columns.entries()).sort(
      (a, b) => columnTypes.indexOf(a[0]) - columnTypes.indexOf(b[0])
    )
  );

  const board: Board = {
    columns: sortedColumns,
  }

  return board;
}
export default getTodosGroupedByColumn;