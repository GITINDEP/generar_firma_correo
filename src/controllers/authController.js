const jwt = require('jsonwebtoken');
const dataFirmaServices = require('../services/datosFirmaServices');
const postgresServices = require('../services/postgresServices');

const usuarioModel = require('../models/usuarios_model');

const activeDirectory = require('activedirectory');

function viewAuth (req, res){
    res.render('inicio');
}
function viewDataAD(req,res){
    res.render('datos');
}

function login(req, res){
    try {
        if(process.env.ACTIVE_DIRECTORY == 'true'){
            return loginAD(req,res);
        }else{
            return loginDB(req, res);
        }
    } catch (error) {
        res.status(500).json({success: false, error:error.message, dataerror:"authController/login"})
    }
}

async function loginDB(req, res){
    try {
        const user = req.body.user.trim().toLowerCase();
        const pass = req.body.pass;

        if(!user || !pass){
            return res.status(301).json({success: false,msg:"Ingrese usuario y contraseña", dataerror:"authController/loginDB"})
        }

        const dataUser = await postgresServices.getAll(usuarioModel,"",{correo:user});

        console.log('dataUser',dataUser);


    } catch (error) {
        
    }
}

function loginAD(req, res){
    try {
        const user = req.body.user.trim().toLowerCase();
        const pass = req.body.pass;
        let newUser = "";
        let newUsername = "";
        let admin = false;

        if(!user || !pass){
            return res.status(301).json({success: false,msg:"Ingrese usuario y contraseña", dataerror:"authController/loginAD"})
        }

        if(user.includes('@')){ //Validamos que el usuario ingresado sea completo
            newUsername = user.split('@')[0];
            newUser = newUsername+'@indep.gob.mx'
        }else{
            newUsername = user;
            newUser = newUsername +'@indep.gob.mx'
        }

        let config = { 
            url: process.env.URL_AD,
            baseDN: process.env.BASEDN_AD,
            username: newUser,
            password:pass
        }

        let ad = new activeDirectory(config);
        ad.authenticate(newUser,pass,(err,auth)=>{
            if(err){
                return res.status(401).json({sucess:false, msg:"Intente más Tarde",dataerror:"authController/loginAD"})
            }

            if(auth){
                const attributes = ['userPrincipalName', 'mail', 'sn', 'givenName', 'cn', 'displayName', 'description', 'pager'];
                ad.findUser({attributes:attributes},newUser.split('@')[0], async (err,userAD)=>{
                    if(err){
                        return res.status(301).json({success:false, msg:"Intente más tarde", dataerror:"authController/loginAD"})
                    }else{
                        const usuariosAdmin = await postgresServices.getAll(usuarioModel,"",{usuario:newUsername});
                        if(userAD.mail == newUser){
                            const token = jwt.sign(
                                {
                                    user
                                },
                                process.env.SECRET_JWT,
                                { expiresIn: "1h" }
                            );

                            if(usuariosAdmin.length > 0) admin = true;

                      const  dataFirma = await dataFirmaServices.queryDataEmp(newUser);
                      if(dataFirma.length > 0){
                          req.session.usuario = {
                                                   nombre: dataFirma[0].Nombre,
                                                   area: dataFirma[0].AreaDesc,
                                                   puesto: dataFirma[0].PuestoDesc,
                                                   correo: dataFirma[0].Correo,
                                                   telefono:"55 1719 1600",
                                                   ext: dataFirma[0].Ext,
                                                   token:token,
                                                   admin:admin
                                               };
                               res.cookie('authToken', token, {
                                   httpOnly: true,
                                   sameSite: 'strict',
                                   expires: new Date(
                                   Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 1000
                                   ),
                               });
                       console.log(dataFirma)
    
                       //res.redirect('/inicio');
                       //res.cookie(process.env.APP_COOKIE_NAME,token,coockieOptions);
                       return res.status(201).json({success: true, msg:"Inicio de Sesión Correcto", token, dataFirma});

                      }else{
                        return res.status(401).json({sucess:false, msg:"No hay datos que mostrar",dataerror:"authController/loginAD"})
                      }

                        }else{
                            return res.status(301).json({success:false,msg:"Usuario y/o Contraseña Incorrectos",dataerror:"authController/loginAD"});
                        }
                    }
                });
            }else{
                return res.status(301).json({success:false,msg:"Ingrese usuario y contraseña", dataerror:"authController/loginAD"});
            }
        });
    } catch (error) {
        
    }
}


module.exports = {
    viewAuth,
    viewDataAD,
    login
}