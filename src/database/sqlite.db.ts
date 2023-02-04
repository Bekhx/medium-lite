import { Sequelize } from "sequelize";

const db = new Sequelize('medium', '', '', {
  storage: process.env.SQLITE_DB_PATH,
  dialect: "sqlite",
  logging: false
});

// db.sync option = { force: process.env.ENV === 'dev' }

db.sync().then(() => console.log('Connected to sqlite database!'));

export default db;