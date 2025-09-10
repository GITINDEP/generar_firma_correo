const cat_apartados_model = require('../models/cat_apartado_firma_model');
const cat_tipo_archivos_model = require('../models/cat_tipo_archivo_model');
const configuraciones_model = require('../models/configuraciones_firma_model');
const archivoModel = require('../models/archivos_model');
const postgresServices = require('../services/postgresServices');

exports.renderViewConfiguracion = async(req,res)=>{
    const apartados = await postgresServices.getAll(cat_apartados_model);
    const tipo_archivo = await postgresServices.getAll(cat_tipo_archivos_model);
    const usuario = req.session.usuario;
    console.log(apartados);
    postgresServices.renderView(res,'configuraciones',{
        apartados,
        tipo_archivo,
        usuario
    })
}


exports.getAllApartador = async (req, res)=>{
    try {
        const apartados = await postgresServices.getAll(cat_apartados_model);
        res.status(201).json({success: true,apartados});
    } catch (error) {
        res.status(301).json({success:false,msg:`Error: ${error.message}`})
    }

}

exports.getAllTipoArchivos = async (req, res)=>{
    try {
        const tipo_archivo = await postgresServices.getAll(cat_tipo_archivos_model);
        res.status(201).json({success: true,tipo_archivo});
    } catch (error) {
        res.status(301).json({success:false,msg:`Error: ${error.message}`})
    }

}

exports.getAllConfiguraciones = async (req, res)=>{
    try {
        const configuraciones = await postgresServices.getAll(configuraciones_model,cat_apartados_model);
        console.log(configuraciones);
        res.status(201).json({success: true,configuraciones});
    } catch (error) {
        res.status(301).json({success:false,msg:`Error: ${error.message}`})
    }

}

exports.getAllConfiguracionesActivas = async (req, res)=>{
    try {
        const configuraciones = await postgresServices.getAll(configuraciones_model,cat_apartados_model,{activo:true});
        console.log(configuraciones);
        res.status(201).json({success: true,configuraciones});
    } catch (error) {
        res.status(301).json({success:false,msg:`Error: ${error.message}`})
    }

}

exports.getAllFiles = async(req, res)=>{
        try {
        const archivos = await postgresServices.getAll(archivoModel,"");
        console.log(archivos);
        res.status(201).json({success: true,archivos});
    } catch (error) {
        res.status(301).json({success:false,msg:`Error: ${error.message}`})
    }
}

exports.getAllFileActivo = async(req, res)=>{
        try {
        const archivo = await postgresServices.getAll(archivoModel,"",{activo:true});
        console.log(archivo);
        res.status(201).json({success: true,archivo});
    } catch (error) {
        res.status(301).json({success:false,msg:`Error: ${error.message}`})
    }
}

exports.addConfiguracion = async(req, res)=>{
    const data = req.body;
    try {
        const agregarConfiguración = await postgresServices.add(configuraciones_model,data)
        res.status(201).json({success: true,msg:"Configuración agregada con exito!!!"})
    } catch (error) {
         res.status(500).json({success: true,msg:`Error: ${error.message}`})
    }
}

exports.isActive = async(req, res)=>{
    try {
        const {activo,id_apartado} = req.body;
        const id= req.params.id;
        console.log('req.body',req.body)
        console.log('req.params',req.params.id)
        const buscarActivo = await postgresServices.getAll(configuraciones_model,"",{fk_id_cat_apartado_firma:id_apartado,activo:true});
        console.log('buscarActivo',buscarActivo);
        if(buscarActivo.length >0){
            console.log('Encontrdo un apartado',buscarActivo[0].dataValues.id_configuracion);
            await postgresServices.isActive(configuraciones_model,{activo:false},{id_configuracion:buscarActivo[0].dataValues.id_configuracion});
        }
            const active = await postgresServices.isActive(configuraciones_model,{activo:activo},{id_configuracion:id});
            res.status(201).json({success: true,msg:"Configuración modificada con exito!!!"}) 
            console.log('No hay selección de este apartado')
        

    } catch (error) {
        res.status(500).json({success: true,msg:`Error: ${error.message}`});
    }
}

exports.isActiveImage = async(req, res)=>{
    try {
        const {activo} = req.body;
        const id = req.params.id;
        console.log('req.body',req.body)
        console.log('req.params',req.params.id)
        const buscarImage = await postgresServices.getAll(archivoModel,"",{activo:true});
        console.log('buscarActivo',buscarImage);
        if(buscarImage.length>0){
            await postgresServices.isActive(archivoModel,{activo:false},{id_archivo:buscarImage[0].dataValues.id_archivo});
        }

        await postgresServices.isActive(archivoModel,{activo:activo},{id_archivo:id});
        res.status(201).json({success: true,msg:"Imagen Activa Correctamente!!!"});
    } catch (error) {
        res.status(500).json({success: true,msg:`Error: ${error.message}`});
    }
}


exports.addFile = async (req,res)=>{

    try {
    const {filename,size,mimetype,destination} = req.file;
    console.log(destination.split('/')[3]);
    const data ={
        ruta_archivo:`${destination.split('/')[3]}/${destination.split('/')[4]}/${destination.split('/')[5]}/${filename}`,
        tipo_archivo:mimetype,
        tamanio_archivo:size,
        fk_id_cat_tipo_archivo:1
    }
    const agregarArchivo = await postgresServices.add(archivoModel,data)
    res.status(201).json({success: true,msg:"Configuración agregada con exito!!!"})
        
    } catch (error) {
          res.status(500).json({success: true,msg:`Error: ${error.message}`});
    }
}

