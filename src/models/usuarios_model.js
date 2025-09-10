const dbConection = require('../config/dbPostgre');
const { Sequelize, DataTypes } = require('sequelize');

const usuarios = dbConection.define('usuarios',
    {
        id_usuario:{
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        usuario:{
            type: DataTypes.STRING
        },
        fk_id_cat_tipo_usuario:{
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

module.exports = usuarios;