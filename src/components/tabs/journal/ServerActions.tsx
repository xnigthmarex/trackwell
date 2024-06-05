"use server"
import prisma from "@/lib/prisma"

export async function get_journals(props:any) {
    const journals = await prisma.journal.findMany({
        where: {
            userId: props?.props?.user?.id
        }
    });
    return journals;
}

export async function create_journal(props:any, title:string, content?:string) {
    const journal = await prisma.journal.create({
        data: {
            title: props.title,
            content: props.content,
            userId: props?.props?.user?.id
        }
    });
    return journal;
}
