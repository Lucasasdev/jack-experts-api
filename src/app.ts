import express, { Request, Response } from "express";
import routes from "./routes/routes";
import morgan from "morgan";
import helmet from "helmet";
import { verifyJwt } from "./middlewares/verifyToken";
const app = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(helmet());

app.use("/api", routes);

app.get("/", verifyJwt, (req: Request, res: Response) => {
  res.sendStatus(200);
});

export default app;
