import {Board, TypedColumn} from "@/app/types";
import {Todo} from "@prisma/client";

const getSummary = async (board: Board) => {
  const formatTodosForGPT = (board: Board) => {
    const todos = Array.from(board.columns.entries());

    const flatArray = todos.reduce((map, [key, value]) => {
      map[key] = value.todos;
      return map;
    }, {} as { [key in TypedColumn]: Todo[] });

    return Object.entries(flatArray).reduce(
      (map, [key, value]) => {
        map[key as TypedColumn] = value.length;
        return map;
      },
      {} as { [key in TypedColumn]: number }
    );
  }

  const todos = formatTodosForGPT(board);

  const res = await fetch("https://goal-keeper.vercel.app/api/summary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todos }),
  })

  const { content } = await res.json();
  return content;
}
export default getSummary;