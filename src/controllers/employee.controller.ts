import { Context } from 'elysia';
import * as employeeService from '../services/employee.service';
import { Employee } from '@prisma/client';

export const getEmployees = async ({set}:Context)=>{
    try {
        const employees = await employeeService.getEmployee();
        return {
            message: "Employees fetched successfully",
            data: employees
        }
    } catch (error) {
        set.status = 400;
        console.error("Error fetching employees:", error);
        return { message : "Failed to fetch employees"}
    }
}

export const getEmployeeById = async ({set,params}:Context<{params: { id: string }}>) => {
    try {
        const { id } = params;
        const employee = await employeeService.getEmployeeById(id);
        if (!employee) {
            return {
                message: "Employee not found",
                data: null
            };
        }
        return {
            message: "Employee fetched successfully",
            data: employee
        };
    } catch (error) {
        set.status = 400;
        console.error("Error fetching employee by ID:", error);
        return { message : "Failed to fetch employee by ID"}
    }
}

export const createEmployee = async ({body,set}:Context)=> {
    try {
        const { name, role } = body as Required<Employee>;
        const newEmployee = await employeeService.createEmployee({
            name,
            role: role === "owner" ? "owner" : "employee"
        })
        return{
            message: "Employee created successfully",
            data: newEmployee
        }
    } catch (error) {
        set.status = 400;
        console.error("Error creating employee:", error);
        return { message: "Failed to create employee"}
    }
}

