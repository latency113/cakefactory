import * as cakeService from '../services/caketask.service';
import { Context } from 'elysia';
import { CakeTask } from '@prisma/client';

export const getCakes = async ({ set }: Context) => {
    try {
        const now = new Date();
        const cakes = await cakeService.getCake();

        const updatedCakes = await Promise.all(cakes.map(async (task) => {
            const remainingMinutes = (new Date(task.endTime).getTime() - now.getTime()) / 60000;

            if (remainingMinutes <= 0 && task.status !== 'done' && task.status !== 'burned') {
                await cakeService.updateCakeStatus(task.id, 'burned');
                task.status = 'burned';
            }

            return {
                ...task,
                remainingMinutes: Math.max(0, Math.round(remainingMinutes))
            };
        }));

        return {
            message: "Cakes fetched successfully",
            data: updatedCakes
        };
    } catch (error) {
        set.status = 400;
        console.error("Error fetching cakes:", error);
        return { message: "Failed to fetch cakes" };
    }
};



export const getCakeById = async ({ set, params }: Context<{ params: { id: string } }>) => {
    try {
        const { id } = params;
        const now = new Date();

        const cake = await cakeService.getCakeById(id);

        if (!cake) {
            set.status = 404;
            return {
                message: "Cake not found",
                data: null
            };
        }

        const remainingMinutes = (new Date(cake.endTime).getTime() - now.getTime()) / 60000;

        return {
            message: "Cake fetched successfully",
            data: {
                ...cake,
                remainingMinutes: Math.max(0, Math.round(remainingMinutes))
            }
        };
    } catch (error) {
        set.status = 400;
        console.error("Error fetching cake by ID:", error);
        return { message: "Failed to fetch cake by ID" };
    }
};


export const createCake = async ({ body, set, params }: Context<{ params: { employeeId: string } }>) => {
    try {
        const { employeeId } = params;
        if (!employeeId) {
            set.status = 400;
            return { message: "Employee ID is required" };
        }
            const { cakeType, estimatedMinutes, status = "preparing", note } = body as Partial<CakeTask>;

        if (!cakeType || !estimatedMinutes) {
            set.status = 400;
            return { message: "Cake type and estimatedMinutes is required" };
        }

        const startTime = new Date();
        const endTime = new Date(startTime.getTime() + estimatedMinutes * 60000);
        const newCake = await cakeService.createCake({
            cakeType,
            startTime,
            endTime,
            estimatedMinutes,
            status,
            note: note ?? undefined,
            employeeId
        });
        return {
            message: "Cake created successfully",
            data: newCake
        };
    } catch (error) {
        set.status = 400;
        console.error("Error creating cake:", error);
        return { message: "Failed to create cake"}
    }
}

export const updateCake = async ({body, set, params}:Context<{params : { id: string }}>) => {
    try {
        const { id } = params;
        const { cakeType, startTime, estimatedMinutes, status, note } = body as Partial<CakeTask>;
        const updatedCake = await cakeService.updateCake(id, {
            cakeType,
            startTime: startTime ? new Date(startTime) : undefined,
            endTime: startTime ? new Date(startTime.getTime() + (estimatedMinutes ?? 0) * 60000) : undefined,
            estimatedMinutes,
            status,
            note: note ?? undefined
        });
        return {
            message: "Cake updated successfully",
            data: updatedCake
        };
    } catch (error) {
        set.status = 400;
        console.error("Error updating cake:", error);
        return { message: "Failed to update cake"}
    }
};