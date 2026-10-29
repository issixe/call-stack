import express from "express";
import cors from "cors";
import users from "./src/interfaces/http/routes/userRoutes.js";
import modules from "./src/interfaces/http/routes/moduleRoutes.js";
import lessons from "./src/interfaces/http/routes/lessonRoutes.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", users);
app.use("/modules", modules);
app.use("/lessons", lessons);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
