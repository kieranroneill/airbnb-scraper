import { Connection, createConnection } from 'mongoose';

// Config.
import * as dbConfig from '../../config/db';

/**
 * Convenience function for connecting to the MongoDB.
 * @param {string} uri the MongoDB URI.
 * @returns {Connection} a mongoose connection.
 */
export default function (uri: string): Connection {
  return createConnection(uri, dbConfig.defaultConnectionOptions);
}
