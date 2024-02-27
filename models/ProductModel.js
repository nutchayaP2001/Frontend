import { Sequelize } from "sequelize";
import db from '../config/Database.js';
import Category from "./CategoryModel.js";
import Users from './UserModel.js';
// import Cart from "./CartModel.js";
// import CartItem from "./CartItemModel.js";

const {DataTypes} = Sequelize;

const Products = db.define('products', {
    // id: {
    //     type: DataTypes.STRING,
    //     // defaultValue: DataTypes.UUIDV4,
    //     autoIncrement: true ,
    //     primaryKey: true
    //     },
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    ProName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 225] 
        }
    },
    ProSize: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            // len: [2, 225] 
        }
    },
    ProDes: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true,
            len: [3,225]
        }
    },
    ProQuantity: {
        type: DataTypes.INTEGER
    },
    ProPrice: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.0,
        validate: {
            notEmpty: true
        }
    },
    ProUnit: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            // len: [2, 225] 
        }
    },
    ProImage: {
        type: DataTypes.STRING,
        defaultValue: 'noimage.jpg'
    },
    ProURL: {
        type: DataTypes.STRING
    },
    categoryId: {
        type: DataTypes.INTEGER,
        
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
});

Category.hasMany(Products);
Products.belongsTo(Category, {foreignKey: 'categoryId'});

Users.hasMany(Products);
Products.belongsTo(Users, {foreignKey: 'userId'});


// Products.belongsToMany(Cart, { through: CartItem})

export default Products;