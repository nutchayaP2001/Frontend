import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Category from "./CategoryModel.js";
import Customers from "./CustomerModel.js";
import Products from "./ProductModel.js";
import Orders from "./OrderModel.js";

const {DataTypes} = Sequelize;

const Payments = db.define('payments', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    bank:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    date_pay: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            notEmpty: true
        }
    },
    slipImage: {
        type: DataTypes.STRING,
        defaultValue: 'noimage.jpg'
    },
    slipURL: {
        type: DataTypes.STRING
    },
    payment_status: {
        type: DataTypes.STRING,
        defaultValue: "รอดำเนินการ"
    },
    productId: {
        type: DataTypes.INTEGER
    },
    categoryId: {
        type: DataTypes.INTEGER
    },
    orderId: {
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

Category.hasMany(Payments);
Payments.belongsTo(Category, {foreignKey: 'categoryId'});

Customers.hasMany(Payments);
Payments.belongsTo(Customers, {foreignKey: 'cusId'});

Products.hasMany(Payments);
Payments.belongsTo(Products, {foreignKey: 'productId'});

Orders.hasMany(Payments);
Payments.belongsTo(Orders, {foreignKey: 'orderId'});


export default Payments;