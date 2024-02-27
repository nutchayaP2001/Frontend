import { Sequelize } from "sequelize";
import db from "../config/Database.js";


const {DataTypes} = Sequelize;

const Category = db.define('category', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true 
        }
    },
    CatName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 225] 
        }
    },
}, {
    freezeTableName: true,
    paranoid:true,
    deletedAt: 'soft_delete'
});

export default Category;