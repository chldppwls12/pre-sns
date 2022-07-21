import winstonDaily from "winston-daily-rotate-file";
import { createLogger, transports, format } from "winston";

interface TransformableInfo {
  level: string;
  message: string;
  [key: string]: any;
}

const logDir = "logs";
const logger = createLogger({
  transports: [
    new transports.Console({
      level: "debug",
      format: format.combine(
        format.timestamp({
          format: "YYYY-MM-DD HH:mm:ss",
        }),
        format.colorize(),
        format.printf(
          (info: TransformableInfo) => `${info.timestamp} - ${info.level}: ${info.message}`
        )
      ),
    }),
    new winstonDaily({
      level: "info",
      datePattern: "YYYY-MM-DD",
      dirname: logDir,
      filename: `%DATE%.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
    new winstonDaily({
      level: "error",
      datePattern: "YYYY-MM-DD",
      dirname: logDir + "/error",
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

export default logger;
