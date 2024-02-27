import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Customers = db.define('customers', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        validate: {
            notEmpty: true 
        }
    },
    CusFname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 225] 
        }
    },
    CusLname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 225] 
        }
    },
    CusUsername: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    CusPass: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true
        }
    },
    CusHouseNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true
        }
    },
    CusMoo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true
        }
    },
    CusPlace: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true,
            // len: [3, 100] 
        }
    },
    CusDistrict: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true,
            // len: [3, 100] 
        }
    },
    CusProvince: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true,
            // len: [3, 100] 
        }
    },
    CusZipcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true,
            // len: [3, 100] 
        }
    },
    CusTel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true,
            // len: [3, 100] 
        }
    }
}, {
    freezeTableName: true,
    paranoid:true,
    deletedAt: 'soft_delete'
});

export default Customers;