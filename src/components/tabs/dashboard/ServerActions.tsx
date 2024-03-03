"use server"
import prisma from "@/lib/prisma";

export async function createTodo(props: any) {
  console.log(props);
  const result = await prisma.todo.create({
    data: {
     
      content: props.content,
      user: {
        connect: {
          id: props.userId,
        },
      },
    },
  });
  return result;
}

export async function getTodos(props: any) {
  const result = await prisma.todo.findMany({
    where: {
      userId: props,
    },
  });
  console.log(result);
  return result;
}