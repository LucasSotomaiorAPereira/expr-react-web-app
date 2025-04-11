import express from "express";
import cors from "cors";
import userRoutes from "./Routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

app.listen(8800, () => {
    console.log("Servidor rodando na porta 8800");
});