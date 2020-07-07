import { Pool } from "pg";

const db = new Pool({
  user: "admin",
  host: "localhost",
  database: "api",
  password: "admin123",
  port: 5432,
});

const conn = async () => {
  try {
    await db.connect()
  } catch (error) {
    console.log(error);
  }
};
export default conn;
