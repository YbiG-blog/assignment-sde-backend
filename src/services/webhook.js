/**
 * @fileoverview This file contains the webhook service.
 */
const imageProcessingWebhookService = async (data) => {
  try {
    logInfo("Processing image data", data);
  } catch (error) {
    logError("Webhook request processing failed");
    logError(error);
  }
};

module.exports = { imageProcessingWebhookService };
