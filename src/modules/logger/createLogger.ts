import { createLogger, Logger, transports } from 'winston';

export default function (): Logger {
  return createLogger({
    transports: [
      new transports.Console(),
    ]
  });
}
