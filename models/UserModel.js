import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const Users = db.define('users', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
    userFname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 225] 
        }
    },
    userLname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 225] 
        }
    },
    userEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    userPass: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true
        }
    },
    userHouseNo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true
        }
    },
    userMoo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true
        }
    },
    userPlace: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true,
            // len: [3, 100] 
        }
    },
    userDistrict: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true,
            // len: [3, 100] 
        }
    },
    userProvince: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true,
            // len: [3, 100] 
        }
    },
    userZipcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true,
            // len: [3, 100] 
        }
    },
    userTel: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // notEmpty: true,
            // len: [3, 100] 
        }
    },
    userRole: {
        type: DataTypes.STRING,
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

export default Users;
