import { Sequelize } from "sequelize";

const db = new Sequelize('project_bestphoto','root', '',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;