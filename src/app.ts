import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { employeeRoute } from "./routes/employee.route";
import { cakeTaskRoute } from "./routes/caketask.route";
import { workLogRoute } from "./routes/worklog.route";
// import { reportRoute } from "./routes/report.route";

export const app = new Elysia()
  // .use(reportRoute)
  .use(workLogRoute)
  .use(cakeTaskRoute)
  .use(employeeRoute)
  .use(
    swagger({
      documentation: {
        info: {
          title: "Elysia API",
          description: "API documentation for Elysia",
          version: "1.0.0",
        },
      },
    })
  )
  .get("/", () => "Hello Elysia");
