const dbConection = require('../config/dbPostgre');
const { Sequelize, DataTypes } = require('sequelize');

const cat_tipo_archivos = dbConection.define('cat_tipo_archivos',
    {
        id_cat_tipo_archivo:{
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        tipo_archivo:{
            type: DataTypes.STRING
        },
        f_reg: {
            type: 'TIMESTAMP WITHOUT TIME ZONE',
            allowNull: false,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        activo:{
            type: DataTypes.BOOLEAN
        },
    },
    {
        createdAt: false,
        updatedAt: false
    }
);

module.exports = cat_tipo_archivos;