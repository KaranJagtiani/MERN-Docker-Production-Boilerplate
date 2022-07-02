const Joi = require("joi");
const lodash = require("lodash");

const validateParams = function (paramSchema) {
  return async (req, res, next) => {
    const schema = Joi.object().keys(paramSchema);
    const paramSchemaKeys = Object.keys(paramSchema);
    let requestParamObj = {};
    for (let key of paramSchemaKeys) {
      requestParamObj[key] = lodash.get(req.body, key);
    }
    try {
      await schema.validateAsync(requestParamObj);
    } catch (err) {
      return res.json({
        success: false,
        msg: err.details[0].message, // Something went wrong.
      });
    }
    next();
  };
};

module.exports = {
  validateParams: validateParams,
};
