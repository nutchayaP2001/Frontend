import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const districtSchema = db.define('district', {
    code: {
        type: DataTypes.STRING
    },
    name_th: {
        type: DataTypes.STRING
    },
    name_en: {
        type: DataTypes.STRING
    },
    province_code: {
        type: DataTypes.STRING
    }
});


export default districtSchema;