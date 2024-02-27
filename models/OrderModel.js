import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Category from "./CategoryModel.js";
import Customers from "./CustomerModel.js";
import Products from "./ProductModel.js";

const {DataTypes} = Sequelize;

const Orders = db.define('orders', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    order_date:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    order_picupdate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    order_amount: {
        type: DataTypes.INTEGER
    },
    order_price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            notEmpty: true
        }
    },
    order_status: {
        type: DataTypes.STRING,
        defaultValue: "รอดำเนินการ"
    },
    productId: {
        type: DataTypes.INTEGER
    },
    categoryId: {
        type: DataTypes.INTEGER
    },
    cusId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
},{
    freezeTableName: true,
    paranoid: true,
    deletedAt: 'soft_delete'
});

Category.hasMany(Orders);
Orders.belongsTo(Category, {foreignKey: 'categoryId'});

Customers.hasMany(Orders);
Orders.belongsTo(Customers, {foreignKey: 'cusId'});

Products.hasMany(Orders);
Orders.belongsTo(Products, {foreignKey: 'productId'});


export default Orders;