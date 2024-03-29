const Validator=require('validator');
const isEmpty =require('./is-empty');

module.exports=function vaidateLoginInput(data){


    let errors={};
    
    data.email=!isEmpty(data.email) ? data.email : '';
    data.password=!isEmpty(data.password) ? data.password : '';
   


    if(!Validator.isEmail(data.email)){

        errors.email='Email is invalid';
    }

    if(Validator.isEmpty(data.email)){

        errors.email='Email field is invalid';
    }

   

    if(Validator.isEmpty(data.password)){

        errors.password='Password field is invalid';
    }








    
    return{
        errors,
        isValid: isEmpty(errors)
    };
};