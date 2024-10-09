// service
const { imageProcessingWebhookService } = require("../services/webhook");
// utils
const { responseMessage, responseTemplate } = require("../utils/response");

const { WEBHOOK_API_KEY } = process.env;

/**
 *
 * @returns {Object} - Response object
 * @description Processes the image processing webhook request
 */
const imageProcessingWebhook = async (req, res) => {
  try {
    const apiKey = req.headers["x-api-key"];
    if (apiKey !== WEBHOOK_API_KEY) {
      return res
        .status(401)
        .json(
          await responseTemplate(false, responseMessage.unauthorizedAccess)
        );
    }
    await imageProcessingWebhookService(req.body);
    return res
      .status(200)
      .json(
        await responseTemplate(true, "Webhook request processed successfully")
      );
  } catch (error) {
    logError(error);
    return res
      .status(500)
      .json(
        await responseTemplate(false, responseMessage.serverError, null, error)
      );
  }
};

module.exports = { imageProcessingWebhook };
