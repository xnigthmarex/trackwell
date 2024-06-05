"use server"
import prisma from "@/lib/prisma"

export async function get_journals(props:any) {
    
    const journals = await prisma.journal.findMany({
        where: {
            userId: props?.props?.id
        },
        take: 10
    });
    return journals;
}

export async function create_journal(props:any) {
    //connect user
    const journal = await prisma.journal.create({
        data: {
            title: props.title,
            content: props.content,
            user: {
                connect: {
                    id: props.userId
                }
            }
        }
    });
    return journal;
}

export async function update_journal(props:any) {
    const journal = await prisma.journal.update({
        where: {
            id: props.id
        },
        data: {
            content: props.content
        }
    });
    return journal;
}