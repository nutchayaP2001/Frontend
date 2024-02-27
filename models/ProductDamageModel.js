import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Category from "./CategoryModel.js";
import Customers from "./CustomerModel.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const ProductDamage = db.define('productdamages', {
    id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    date_pickupProduct: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    damageImage: {
        type: DataTypes.STRING,
        defaultValue: 'noimage.jpg'
    },
    damageURL: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "รอดำเนินการแก้ไข"
    },
    admin_note: {
        type: DataTypes.STRING,
        defaultValue: 'รอดำเนินการแก้ไข'
        
    },
    // userId: {
    //     type: DataTypes.INTEGER,
    //     allowNull: false
        
    // },
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

Category.hasMany(ProductDamage);
ProductDamage.belongsTo(Category, {foreignKey: 'categoryId'});

Customers.hasMany(ProductDamage);
ProductDamage.belongsTo(Customers, {foreignKey: 'cusId'});

// Users.hasMany(ProductDamage);
// ProductDamage.belongsTo(Users, {foreignKey: 'userId'})

export default ProductDamage;