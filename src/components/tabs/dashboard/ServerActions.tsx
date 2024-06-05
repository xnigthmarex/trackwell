"use server"
import prisma from "@/lib/prisma";

export async function createTodo(props: any) {
  
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
    take: 15,
  });
  return result;
}

export async function deleteTodo(props: any) {
  const result = await prisma.todo.delete({
    where: {
      id: props,
    },
  });
  return result;
}

export async function toggleTodo(props: any) {
  const todo = await prisma.todo.findUnique({
    where: {
      id: props,
    },
  });
  const result = await prisma.todo.update({
    where: {
      id: props,
    },
    data: {
      completed: !todo?.completed,
    },
  });
  return result;
}