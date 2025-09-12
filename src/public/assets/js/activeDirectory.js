async function vaidateAD(){
    try {
        let user = document.getElementById('email').value;
        let pass = document.getElementById('password').value; 
        const url = '/login';
        $('#lockscreen').fadeIn();
/*         let spinner = document.querySelector('.spinner');
        spinner.style.visibility = 'hidden'; */
        const  response = await fetch(url,{
            method:'POST',
            headers:{ 'Content-Type': 'application/json'},
            body:JSON.stringify({user,pass})
        });
        
        const data  = await response.json();
        console.log('data',data);
    
        if(data.success == true){
              $('#lockscreen').fadeOut();

            document.location.href ="/inicio";
        } else{
               $('#lockscreen').fadeOut();
            $.alert({
                title: "Advertencia",
                content: `<strong>${data.msg}</strong>`,
                theme: 'modern',
                icon: 'fa-solid fa-triangle-exclamation',
                type: "red"
            });
        }
        
    } catch (error) {
        
    } finally{
        spinner.style.display = 'none';
    }


}