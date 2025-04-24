import express from "express";
import cors from "cors";
import languageRoutes from "./Routes/users.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", languageRoutes);

app.listen(8800, () => {
    console.log("Server running on port 8800");
});