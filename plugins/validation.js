import { extend } from 'vee-validate';


extend("min", {
    message: "This {_field_} is invalid.",
    validate: value => {
        return value.length >= 3;
    }
  });