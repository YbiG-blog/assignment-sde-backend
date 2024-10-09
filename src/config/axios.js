const { create } = require("axios");

const { WEBHOOK_ENDPOINT, WEBHOOK_API_KEY } = process.env;

const webhookAxios = create({
  baseURL: WEBHOOK_ENDPOINT,
  headers: {
    "x-api-key": WEBHOOK_API_KEY,
  },
});

module.exports = { webhookAxios };
