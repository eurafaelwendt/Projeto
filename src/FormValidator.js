import validator from 'validator';

class FormValidator{

    constructor(validation){
        this.validation = validation;
    }

    validates(state){
       
        const valueField = state[this.validation.field.toString()];
        const validationMethod = validator[this.validation.method];

        if(validationMethod(valueField, [], state) === true){
            return false;
        }else{
            return true;
        }
    }
}

export default FormValidator;