require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const connectDB  = require("./config/db");
const authRoutes  = require("./routes/authRoutes");
const incomeRoutes  = require("./routes/incomeRoutes");
const expenseRoutes  = require("./routes/expenseRoutes");
const summaryRoutes  = require("./routes/summaryRoutes");
const { swaggerUi, swaggerSpec } = require("./swagger/swagger");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/summary", summaryRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on ${PORT}`))