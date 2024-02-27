import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import CartItem from "./CartItemModel.js";
import Users from "./UserModel.js";


const {DataTypes} = Sequelize;

const Sales = db.define('sales', {
    // id: {
    //     type: DataTypes.BIGINT,
    //     allowNull: false,
    //     primaryKey: true,
    //     autoIncrement: true
    // },
    salesNo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalSalesPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
    }
    // cartItemId: {
    //     type: DataTypes.INTERGER,
    // },
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false,
    //     validate: {
    //         notEmpty: true
    //     }
    // }
}, {
    freezeTableName: true,
    paranoid:true,
    deletedAt: 'soft_delete'
});

// CartItem.hasMany(Sales);
// Sales.belongsTo(CartItem, {foreignKey: 'cartItemId'});

// Users.hasMany(Sales);
// Sales.belongsTo(Users, {foreignKey: 'userId'});


export default Sales;