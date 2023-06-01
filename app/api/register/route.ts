import { hash } from "bcrypt";
import { prisma } from "@/app/libs/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { email, username, password } = body;

    if (!email || !username || !password) {
      return new NextResponse("Please fill out all the fields", {status: 400});
    }

    const hashedPassword = await hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword }
      }
    );

    return NextResponse.json({ user }, { statusText: "Account created successfully! Now sign in to continue" });
  } catch (error: any) {
    console.log(error, 'REGISTRATION_ERROR');
    return new NextResponse('Email id already registered', { status: 500 });
  }
}