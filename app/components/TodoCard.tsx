'use client';

import {Todo} from "@prisma/client";
import {TypedColumn} from "@/app/types";
import {DraggableProvidedDraggableProps, DraggableProvidedDragHandleProps} from "react-beautiful-dnd";
import {FC} from "react";
import {HiXCircle} from "react-icons/hi2";
import useBoardStore from "@/app/store/BoardStore";
import Image from "next/image";
import toast from "react-hot-toast";

interface TodoCardProps {
  todo: Todo;
  index: number;
  id: TypedColumn;
  innerRef: (element: HTMLElement | null) => void;
  draggableProps: DraggableProvidedDraggableProps;
  dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
}

const TodoCard: FC<TodoCardProps> = (
  {
    todo,
    index,
    id,
    innerRef,
    draggableProps,
    dragHandleProps
  }
) => {
  const deleteTask = useBoardStore((state) => state.deleteTask);

  return (
    <div
      {...draggableProps}
      {...dragHandleProps}
      ref={innerRef}
      className="bg-white/70 rounded-lg space-y-2 drop-shadow-md mt-2 backdrop-blur-sm"
    >
      <div className="flex justify-between items-center p-5">
        <p className="text-blue-950">{ todo.title }</p>
        <button
          className="text-red-500 hover:text-red-600"
          onClick={async () => {
            await deleteTask(index, todo, id)
            toast.success("Task deleted successfully")
          }}
        >
          <HiXCircle className="ml-5 h-8 w-8" />
        </button>
      </div>

      {
        todo.image && (
          <div className="h-full w-full rounded-b-lg">
            <Image
              src={todo.image}
              alt="todo image"
              width={400}
              height={200}
              placeholder="blur"
              blurDataURL="/images/placeholder.webp"
              className="w-full object-contain rounded-b-lg"
            />
          </div>
        )
      }
    </div>
  );
}
export default TodoCard;