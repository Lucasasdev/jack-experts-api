import express, { Request, Response } from "express";
import routes from "./routes/routes";
import morgan from "morgan";
import helmet from "helmet";
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  res.sendStatus(200);
});

app.use("/api", routes);

export default app;
