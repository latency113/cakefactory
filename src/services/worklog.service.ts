import prisma from "../prisma/client";

export const getWork = async () => {
    return await prisma.workLog.findMany({
        include: {
            task: true
        }
    });
}


export const getWorkById = async (id: string) => {
    return await prisma.workLog.findUnique({
        where: { id },
    });
}

export const createWork = async (data: {
    taskId: string;
    action: string
    timestamp: Date
}) => {
    return await prisma.workLog.create({
        data: {
            taskId: data.taskId,
            action: data.action,
            timestamp: data.timestamp
        }
    });
}   