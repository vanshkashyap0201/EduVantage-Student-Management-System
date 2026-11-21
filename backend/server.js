const express = require("express");
const cors = require("cors");
const errorMiddleware = require("./middleware/errorMiddleware");
require("dotenv").config();
const PORT = process.env.PORT;
const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/students", require("./routes/studentRoutes"));
app.use("/teachers", require("./routes/teacherRoutes"));
app.use("/users", require("./routes/userRoutes"));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

app.use(errorMiddleware);