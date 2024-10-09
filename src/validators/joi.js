const Joi = require("joi");

const uploadSchema = Joi.array().items(
  Joi.object({
    serialNumber: Joi.string().required(),
    productName: Joi.string().required(),
    inputImageUrls: Joi.string().required(),
  })
);

module.exports = {
  uploadSchema,
};
