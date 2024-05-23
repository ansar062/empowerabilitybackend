const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const courseRoute = require("./Routes/CourseRoute");
const blogRute = require("./Routes/BlogRoute");
const mainRoute = require("./Routes/MainRoute");
const jobRoute = require("./Routes/JobRoute");
const lectureRoute = require("./Routes/LectureRoute");
const feedbackRoute = require("./Routes/FeedbackRoute");
const freelancerRoute = require("./Routes/FreelancerRoute");
const jobApplicationRoute = require("./Routes/JobApplicationRoute");
const {MONGODB, PORT} = process.env;
app.use(cookieParser());

mongoose
  .connect(MONGODB, {
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, (req, res) => {
  console.log(`Server is listening on port ${PORT}`);
 


});

app.use(
    cors({
      origin: ["https://empower-ability.vercel.app", "http://localhost:3000"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  


app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use("/", authRoute);
app.use("/", blogRute);
app.use("/", mainRoute);
app.use("/", jobRoute);
app.use("/", jobApplicationRoute);
app.use("/", courseRoute);
app.use("/freelancer/", freelancerRoute)
app.use("/", lectureRoute)
app.use('/', feedbackRoute)
