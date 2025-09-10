


function habilitaDeshabilitarInputComision(valor){
    document.getElementById('puesto_comision').disabled = valor;
    document.getElementById('area_comision').disabled = valor;
    document.getElementById('puesto_comision').value ="";
    document.getElementById('area_comision').value ="";

}

habilitaDeshabilitarInputComision(true);

function checkboxComision(){
    let check_comision = document.getElementById('checkComision');
    if(check_comision.checked == true){
        habilitaDeshabilitarInputComision(false);
    }else{
        habilitaDeshabilitarInputComision(true);
        document.getElementById('text-area').textContent = document.getElementById('area_firma').value
        document.getElementById('text-puesto').textContent = document.getElementById('puesto_firma').value
    }
}


document.getElementById('area_comision').addEventListener('input',function(){
    document.getElementById('text-area').textContent= this.value.toUpperCase();
    if(document.getElementById('text-area').textContent ==  "") document.getElementById('text-area').textContent = document.getElementById('area_firma').value
});

document.getElementById('puesto_comision').addEventListener('input',function(){
    document.getElementById('text-puesto').textContent= this.value.toUpperCase();
    if(document.getElementById('text-puesto').textContent == "") document.getElementById('text-puesto').textContent =document.getElementById('puesto_firma').value
});

document.getElementById('check_area').addEventListener('change',function(){
    if(this.checked){
         document.getElementById('text-area').style.display = 'block';
        
    }else{

        document.getElementById('text-area').style.display = 'none'; 
    }
});

document.getElementById('check_direccion').addEventListener('change',function(){
    if(this.checked){
        document.getElementById('text-direccion').style.display = 'block'; 
    }else{
        document.getElementById('text-direccion').style.display = 'none'; 

    }
});

document.getElementById('check_correo').addEventListener('change',function(){
    if(this.checked){
        document.getElementById('text-correo').style.display = 'block';
    }else{
        document.getElementById('text-correo').style.display = 'none';
    }
});

 document.getElementById('check_tel_ext').addEventListener('change',function(){
    if(this.checked){
        document.getElementById('text-telefono').style.display = 'block';
    }else{
        document.getElementById('text-telefono').style.display = 'none';
    }
});
 

 
async function descargarFirma(){

    let divParaCapturar = document.getElementById('imageContainer');

    console.log(divParaCapturar);
        
    const canvas = await html2canvas(divParaCapturar,{
    allowTaint: true,
    useCORS: true,
    scale: 2,
    });
    descargar(canvas);

}

function descargar(canvas){

        let enlace = document.createElement('a');
        enlace.textContent = "Descargar Firma";
        enlace.className = 'btn btn-primary';
        enlace.style.marginTop = "10px";
        enlace.href = canvas.toDataURL('image/png'); 
        enlace.download = 'imagen_firma.png';
        enlace.click()
}

