import { createLogger, format, info, transports } from "winston";

const logger = createLogger({
  level: "debug",
  format: format.combine(
    format.colorize(),
    format.timestamp({format:'MM/DD/YYYY hh:mm:ss'}),
    format.json(),
    format.printf(info => {
      return `${info.timestamp} [${info.level}] : ${info.message}`;
    })
),
  transports: [
    new transports.Console(),
    new transports.File({filename: "error.log", level: "error"}),
    new transports.File({filename: "info.log", level: "info"})
  ],
});

export default logger;
