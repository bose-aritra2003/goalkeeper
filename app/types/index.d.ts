import { Todo } from '@prisma/client';

interface Board {
  columns: Map<TypedColumn, Column>
}

type TypedColumn = "todo" | "in_progress" | "done";

interface Column {
  id: TypedColumn,
  todos: Todo[]
}
