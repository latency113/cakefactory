import prisma from "../prisma/client";

export const getCake = async () => {
    return await prisma.cakeTask.findMany({
        include: {
            employee: true,
            logs: true
        }
    });
};


export const getCakeById = async (id: string) => {
    return await prisma.cakeTask.findUnique({
        where: { id },
        include: {
            employee: true,
            logs:true
        }
    });
}

export const createCake = async (data: {
    cakeType: string;
    startTime: Date;
    endTime: Date;
    estimatedMinutes: number;
    status: "preparing" | "baking" | "done" | "burned" | "undercooked";
    note?:string
    employeeId: string;
}) => {
    return await prisma.cakeTask.create({
        data: {
            cakeType: data.cakeType,
            startTime: data.startTime,
            endTime: data.endTime,
            estimatedMinutes: data.estimatedMinutes,
            status: data.status,
            note: data.note,
            employeeId: data.employeeId
        }
    });
}

export const updateCake = async (id: string, data: {
    cakeType?: string;
    startTime?: Date;
    endTime?: Date;
    estimatedMinutes?: number;
    status?: "preparing" | "baking" | "done" | "burned" | "undercooked";
    note?: string;
}) => {
    return await prisma.cakeTask.update({
        where: { id },
        data: {
            cakeType: data.cakeType,
            startTime: data.startTime,
            endTime: data.endTime,
            estimatedMinutes: data.estimatedMinutes,
            status: data.status,
            note: data.note
        }
    });
}



export const updateCakeStatus = async (id: string, status: "preparing" | "baking" | "done" | "burned" | "undercooked" ) => {
    return prisma.cakeTask.update({
        where: { id },
        data: { status }
    });
};
