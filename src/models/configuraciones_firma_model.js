const dbConection = require('../config/dbPostgre');
const { Sequelize, DataTypes } = require('sequelize');
const apartadoModel = require('../models/cat_apartado_firma_model');

const configuraciones = dbConection.define('configuraciones',
    {
        id_configuracion:{
            type:  DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        color_letra:{
            type: DataTypes.STRING
        },
        tamanio_letra:{
            type: DataTypes.INTEGER
        },
        estilo_letra:{
            type: DataTypes.STRING
        },
        fk_id_cat_apartado_firma:{
            type: DataTypes.INTEGER,
        references: {
              model: 'cat_apartados_firmas',
              key: 'id_cat_apartado_firma',
            },
            onDelete: 'RESTRICT',
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

configuraciones.belongsTo(apartadoModel,{foreignKey:'fk_id_cat_apartado_firma',sourceKey:'id_cat_apartado_firma'});
apartadoModel.hasOne(configuraciones,{foreignKey:'fk_id_cat_apartado_firma',targetKey:'id_cat_apartado_firma'}); 

module.exports = configuraciones;