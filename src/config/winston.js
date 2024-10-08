const { Logtail } = require("@logtail/node");
const { LogtailTransport } = require("@logtail/winston");
const { createLogger, format, transports } = require("winston");

const { combine, timestamp, printf } = format;

const { LOG_KEY, NODE_ENV } = process.env;

let transportsArray = [new transports.Console()];

if (NODE_ENV === "production" || NODE_ENV === "staging") {
  const logtail = new Logtail(LOG_KEY);
  transportsArray.push(new LogtailTransport(logtail));
}

const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} [${level}] : ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(format.colorize(), timestamp(), myFormat),
  transports: transportsArray,
});

const logInfo = (...msg) => {
  let message = "";
  msg?.forEach((element) => {
    message += JSON.stringify(element) + " ";
  });
  logger.info(message);
};

const logError = (...error) => {
  logger.error(error);
};

module.exports = { logger, logInfo, logError };
