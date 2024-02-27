import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";
import Sales from "./SaleModel.js";
import Products from "./ProductModel.js";


const {DataTypes} = Sequelize;

const CartItem = db.define('cartItem', {
    // id: {
    //     type: DataTypes.BIGINT,
    //     allowNull: false,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    productId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.FLOAT,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },

}, {
    freezeTableName: true,
    paranoid:true,
    deletedAt: 'soft_delete'
});

Products.hasMany(CartItem);
CartItem.belongsTo(Products, {foreignKey: 'productId'});

Sales.hasMany(CartItem);
CartItem.belongsTo(Sales);

Users.hasMany(CartItem);
CartItem.belongsTo(Users, {foreignKey: 'userId'});


export default CartItem;