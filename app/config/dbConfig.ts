// src/config/db.ts
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  `${process.env.DB_NAME}`,
  `${process.env.DB_USER_NAME}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: "localhost",
    dialect: "mysql",
  }
);

export default sequelize;
