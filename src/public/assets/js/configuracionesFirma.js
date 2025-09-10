async function datosConfig(){
    const url = "/configuraciones/getAllActivos"
            const response = await fetch(url,{
            method:"GET",
                    headers: {
                "Content-Type": "application/json",
            }
        });
    
        const data = await response.json();
    console.log(data);
        for(config of data.configuraciones){
            console.log(config)
            if(config.cat_apartados_firma.apartado_firma == 'Nombre'){        
                configFirma(config.color_letra,config.estilo_letra,config.tamanio_letra,'text-nombre')
            }else if(config.cat_apartados_firma.apartado_firma == 'Puesto'){
                configFirma(config.color_letra,config.estilo_letra,config.tamanio_letra,'text-puesto')
            }else if(config.cat_apartados_firma.apartado_firma == 'Área Adscripción'){
                configFirma(config.color_letra,config.estilo_letra,config.tamanio_letra,'text-area')
            }else if(config.cat_apartados_firma.apartado_firma == 'Dirección'){
                configFirma(config.color_letra,config.estilo_letra,config.tamanio_letra,'text-direccion')
            }else if(config.cat_apartados_firma.apartado_firma == 'Correo'){
                configFirma(config.color_letra,config.estilo_letra,config.tamanio_letra,'text-correo')
            }else if(config.cat_apartados_firma.apartado_firma == 'Teléfono'){
                configFirma(config.color_letra,config.estilo_letra,config.tamanio_letra,'text-telefono')
            }else if(config.cat_apartados_firma.apartado_firma == 'Texto hacienda'){
                configFirma(config.color_letra,config.estilo_letra,config.tamanio_letra,'text-hacienda')
            }else if(config.cat_apartados_firma.apartado_firma == 'Nombre indep'){
                configFirma(config.color_letra,config.estilo_letra,config.tamanio_letra,'text-indep')
            }else if(config.cat_apartados_firma.apartado_firma == 'url'){
                configFirma(config.color_letra,config.estilo_letra,config.tamanio_letra,'link-indep')
            }
        }
    
}

datosConfig();

function configFirma(color_letra, estilo_letra,tamanio_letra,id_texto){
    console.log(color_letra, estilo_letra,tamanio_letra);
    const text =document.getElementById(id_texto);
    text.style.color= color_letra;
    text.style.fontSize = `${tamanio_letra}px`;
    if(estilo_letra != ""){
        text.style.fontWeight= estilo_letra; 
    }
}


async function imagenFirmaActiva(){
    const imgCarFirma = document.getElementById('img_card');
    const imgFirma = document.getElementById('imagen_firma');
    const containerImg = document.getElementById('imageContainer');
    const url = "/configuracion/fileActivo"
            const response = await fetch(url,{
            method:"GET",
                    headers: {
                "Content-Type": "application/json",
            }
        });
    
        const data = await response.json();
        imgFirma.src =`/${data.archivo[0].ruta_archivo}`
        console.log(data);
}

imagenFirmaActiva();