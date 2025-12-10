import express from "express";
import paymentRoutes from "./routes/payment.routes";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", paymentRoutes);

app.listen(3001, () => {
  console.log("Backend rodando na porta 3001");
});