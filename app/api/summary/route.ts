import {NextRequest, NextResponse} from "next/server";
import {openai} from "@/app/libs/openai";
import getCurrentUser from "@/app/actions/getCurrentUser";

export const POST = async (request: NextRequest) => {
  const [
    currentUser,
    todos
  ] = await Promise.all([getCurrentUser(), request.json()]);

  if (!currentUser?.id || !currentUser?.email) {
    return new NextResponse('Unauthorised', {status: 401});
  }

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    temperature: 0.8,
    n: 1,
    stream: false,
    messages: [
      {
        role: "system",
        content: `When responding, limit response to less than 100 characters only, always welcome the user as Aritra.`
      },
      {
        role: "user",
        content: `
          Provide a summary in natural human language for the count of each type of tasks.
          Then a creative highly motivational phrase to complete the remaining tasks if any.
          Here are the tasks: ${JSON.stringify(todos)},
        `
      }
    ]
  });

  const { data } = response;
  return NextResponse.json(data.choices[0].message);
}