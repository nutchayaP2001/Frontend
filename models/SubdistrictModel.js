import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const subdistrictSchema = db.define('subdistrict', {
    code: {
        type: DataTypes.STRING
    },
    zip_code: {
        type: DataTypes.STRING
    },
    name_th: {
        type: DataTypes.STRING
    },
    name_en: {
        type: DataTypes.STRING
    },
    district_code: {
        type: DataTypes.STRING
    }
});


export default subdistrictSchema;