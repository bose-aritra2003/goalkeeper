import { prisma } from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const DELETE = async (req: NextRequest, context: { params: any }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser?.email) {
    return new NextResponse('Unauthorised', {status: 401});
  }

  try {
    const todoFromDB = await prisma.todo.delete({
      where: {
        id: context.params.id,
      }
    });
    return new NextResponse(JSON.stringify({todo: todoFromDB}));
  } catch (error) {
    return new NextResponse(JSON.stringify({error}));
  }
}

export const POST = async (request: NextRequest, context: { params: any }) => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser?.email) {
    return new NextResponse('Unauthorised', {status: 401});
  }

  try {
    const body = await request.json();

    const { status } = body;

    const updatedTodo = await prisma.todo.update({
      where: {
        id: context.params.id
      },
      data: { status }
    });

    return NextResponse.json(updatedTodo);
  } catch (error: any) {
    console.log(error, "ERROR_UPDATE_TODO");
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
