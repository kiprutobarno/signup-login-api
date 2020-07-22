import db from "./db";

const create = () => {
  return `CREATE TABLE IF NOT EXISTS users(
      id serial primary key, 
      email varchar(355) not null, 
      password varchar(355) not null, 
      date_created timestamp without time zone, 
      password_reset_token varchar(355), 
      password_reset_token_expiry timestamp without time zone )`;
};

const createTable = async () => {
  try {
    await db.query(create());
  } catch (error) {
    console.log(error);
  }
};

export default createTable;
