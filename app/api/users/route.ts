import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { prisma } from "@/app/libs/prismadb";

export const POST = async (request: NextRequest) => {
  const currentUser = await getCurrentUser();

  if (!currentUser?.id || !currentUser?.email) {
    return new NextResponse('Unauthorised', {status: 401});
  }

  try {
    const { image } = await request.json();

    const updatedUser = await prisma.user.update({
      where: {
        id: currentUser.id
      },
      data: { image }
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.log(error, "ERROR_UPDATE_USER");
    return new NextResponse("Failed to update profile photo", { status: 500 });
  }
}