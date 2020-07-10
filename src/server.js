import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import routes from './routes';

dotenv.config();
const app = express();

app.use(express.urlencoded({ extended: true })); // parse URL-encoded bodies
app.use(express.json()); // parse JSON bodies
app.use(cookieParser()); // parse cookies in headers
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log(`server listening at port ${process.env.PORT}`);
});
