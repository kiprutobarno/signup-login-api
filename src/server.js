import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true })); //parse URL-encoded bodies
app.use(express.json()); //pass JSON bodies

app.use("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log(`server listening at port ${process.env.PORT}`);
});
