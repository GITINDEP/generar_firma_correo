config = {
    APP_URL : "http://localhost:3000",
    APP_PORT : 3000,
    APP_TITLE : "Sistema de Generación de Firma de Correo",
    NODE_ENV : "DEV",
    COOKIE_EXPIRES: 10,
    APP_COOKIE_NAME: "Node_INDEP",
    PG_DB_NAME: "Firma_correo",
    PG_DB_USER: "userfirmacorreo",
    PG_DB_PASSWORD: "userfirmacorreo#25",
    PG_DB_HOST: "165.128.172.122",
    PG_DB_PORT: 5438,
    SQL_SERVER_DB: "SYSNGF_SIRSAE_CAM2014",
    SQL_SERVER_USER: "FDI_cmendezh",
    SQL_SERVER_PASS: "123456",
    SQL_SERVER_HOST: "165.128.172.73",
    URL_AD: 'ldap://indep.gob.mx',
    BASEDN_AD: 'DC=indep,DC=gob,DC=mx',
    SECRET_JWT: "1ND3P-DEV2025",
    ACTIVE_DIRECTORY: true,
    DB_PORT: 1433
}


module.exports = config;