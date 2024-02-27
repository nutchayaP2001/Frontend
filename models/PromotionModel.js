import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Users from "./UserModel.js";
import Products from "./ProductModel.js";

const {DataTypes} = Sequelize;

const Promotions = db.define('promotions', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    type_discount: {
        type: DataTypes.STRING
    },
    discount: {
        type: DataTypes.FLOAT
    },
    date_start: {
        type: DataTypes.STRING
    },
    date_end: {
        type: DataTypes.STRING
    },
    productId: {
        type: DataTypes.INTEGER
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    freezeTableName: true,
    paranoid:true,
    deletedAt: 'soft_delete'
})

Products.hasMany(Promotions);
Promotions.belongsTo(Products, {foreignKey: 'productId'});

Users.hasMany(Promotions);
Promotions.belongsTo(Users, {foreignKey: 'userId'});

export default Promotions;