import { ConnectionOptions } from 'mongoose';

export const defaultConnectionOptions: ConnectionOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
