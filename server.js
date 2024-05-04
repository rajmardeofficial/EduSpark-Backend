const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();
dotenv.config();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("connected to the mongoDB"))
  .catch((err) => console.log("Not Connected To The Network", err));

const TeacherRoutes = require("./routes/TeacherRouters");
const platformRoutes = require("./routes/payment/PlatformRoutes");
const studentRoutes = require("./routes/student/StudentRoutes");
const AdminRoutes = require('./routes/Admin/adminRouters')

app.use("/api", TeacherRoutes);
app.use("/auth/platformCharges", platformRoutes);
app.use("/auth/student", studentRoutes);
app.use("/admin", AdminRoutes);


app.listen(port, () => {
  console.log("Server is running at: http://localhost:5000");
});
