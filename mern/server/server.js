import express from "express";
import cors from "cors";
import users from "./src/enterprise/entities/user.js";
import modules from "./src/enterprise/entities/module.js";
import lessons from "./src/enterprise/entities/lesson.js";
import sessions from "./src/enterprise/entities/session.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", users);
app.use("/modules", modules);
app.use("/lessons", lessons);
app.use("/sessions", sessions);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
