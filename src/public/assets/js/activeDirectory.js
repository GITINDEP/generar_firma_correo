async function vaidateAD(){
    let user = document.getElementById('email').value;
    let pass = document.getElementById('password').value; 
    const url = '/login';
    const  response = await fetch(url,{
        method:'POST',
        headers:{ 'Content-Type': 'application/json'},
        body:JSON.stringify({user,pass})
    });

    const data  = await response.json();
    console.log('data',data);

    if(data.success == true){

        document.location.href ="/inicio";
    } else{
        $.alert({
            title: "Advertencia",
            content: `<strong>${data.msg}</strong>`,
            theme: 'modern',
            icon: 'fa-solid fa-triangle-exclamation',
            type: "red"
        });
    }


}