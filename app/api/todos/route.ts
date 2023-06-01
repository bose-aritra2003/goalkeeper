import { prisma } from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const GET = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser?.email) {
    return new NextResponse('Unauthorised', {status: 401});
  }

  try {
    const todosFromDB = await prisma.todo.findMany({
      where: {
        userId: currentUser?.id
      }
    });
    return new NextResponse(JSON.stringify({todos: todosFromDB}));
  } catch (error) {
    return new NextResponse(JSON.stringify({error}));
  }
}

export const POST = async (req: NextRequest) => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser?.email) {
    return new NextResponse('Unauthorised', {status: 401});
  }

  try {
    const newTodo = await req.json();
    const todoFromDB = await prisma.todo.create({
      data: {
        title: newTodo.title,
        status: newTodo.status,
        image: newTodo.image,
        user: {
          connect: {
            id: currentUser.id
          }
        }
      }
    });
    return new NextResponse(JSON.stringify({todo: todoFromDB}));
  } catch (error) {
    return new NextResponse(JSON.stringify({error}));
  }
}
