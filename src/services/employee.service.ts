import prisma from "../prisma/client";

export const getEmployee = async () => {
    return await prisma.employee.findMany({
        include: {
            tasks: {
                include:{
                    logs:true
                }
            }
        }
    })
}

export const getEmployeeById = async (id: string) => {
    return await prisma.employee.findUnique({
        where: {
            id
        },
        select: {
        id: true,
        name: true,
        role: true,
        tasks: {
            select: {
            id: true,
            cakeType: true,
            startTime: true,
            endTime: true,
            estimatedMinutes: true,
            status: true,
            note: true,
            logs: {
                select: {
                id: true,
                action: true,
                timestamp: true,
                taskId: true
                }
            }
            }
        }
    }
  })
}

export const createEmployee = async (data:{
    name: string
    role: "employee" | "owner";
}) => {
    return await prisma.employee.create({
        data:{
            name: data.name,
            role: data.role
        }
    })
}