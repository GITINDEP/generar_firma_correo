
const active_directory = require('activedirectory');

function authAD(email,password){
    
    const config = { 
                    url: 'ldap://indep.gob.mx',
                    baseDN: 'dc=indep,dc=gob',
                    }
    const ad = new active_directory(config);

     ad.authenticate(email,password,function(err, auth){
        if(err){
            console.log("err",false)
            return false;
        }

        if(auth){
              console.log("autenticado",true)
            return true;
        }else{
              console.log("No autenticado",false)
           return false;
        }
    });   

}

module.exports = {
    authAD
}