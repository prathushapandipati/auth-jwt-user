//validation

const joi = require('@hapi/joi');

//Register Validation
const registerValidation = data => {
    const schema = joi.object({ //samarbetar med User model
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });
    return schema.validate(data);
}

//login validation

const loginValidation = data => {
    const schema = joi.object({
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    });
    return schema.validate(data);
};

module.exports = {
    registerValidation, loginValidation
};