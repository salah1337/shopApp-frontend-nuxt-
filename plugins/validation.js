import { extend } from 'vee-validate';


extend("between", {
    params: ["min", "max"],
    message: "The {_field_} field must be between {min} and {max} characters long.",
    validate: (value, {min, max}) => {
        return value.length >= min && value.length <= max;
    }
});

extend('required', {
    validate (value) {
      return {
        required: true,
        valid: ['', null, undefined].indexOf(value) === -1
      };
    },
    computesRequired: true,
    message: "{_field_} can not be empty."
  });

extend("email", {
    message: "This {_field_} is invalid.",
    validate: value => {
        let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,24})+$/
        return regex.test(value);
    }
});