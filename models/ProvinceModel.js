import { Sequelize } from "sequelize";
import db from '../config/Database.js';

const {DataTypes} = Sequelize;

const provinceSchema = db.define('provinces', {
    code: {
        type: DataTypes.STRING
    },
    name_th: {
        type: DataTypes.STRING
    },
    name_th_short: {
        type: DataTypes.STRING
    },
    name_en: {
        type: DataTypes.STRING
    },
    geography_id: {
        type: DataTypes.STRING
    }
});


export default provinceSchema;