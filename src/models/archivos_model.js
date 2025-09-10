const dbConection = require('../config/dbPostgre');
const { Sequelize, DataTypes } = require('sequelize');

const archivos = dbConection.define('archivos',
    {
        id_archivo:{
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        ruta_archivo:{
            type: DataTypes.STRING
        },
        tipo_archivo:{
            type: DataTypes.STRING
        },
        tamanio_archivo:{
            type: DataTypes.STRING
        },
        fk_id_cat_tipo_archivo:{
            type: DataTypes.INTEGER
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

module.exports = archivos;