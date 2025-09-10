const dbConection = require('../config/dbPostgre');
const { Sequelize, DataTypes } = require('sequelize');

const cat_apartado = dbConection.define('cat_apartados_firmas',
    {
        id_cat_apartado_firma:{
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        apartado_firma:{
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

module.exports = cat_apartado;