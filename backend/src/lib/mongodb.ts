import mongoose from 'mongoose';
import { config } from '../config/env';

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  // 1. If active ready connection exists, return immediately
  if (mongoose.connection.readyState === 1) {
    return mongoose;
  }

  // 2. If actively connecting, await existing promise
  if (mongoose.connection.readyState === 2 && cached.promise) {
    await cached.promise;
    return mongoose;
  }

  // 3. Otherwise, establish fresh connection
  const opts: mongoose.ConnectOptions = {
    bufferCommands: true,
    dbName: 'jamison_real_estate',
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
  };

  cached.promise = mongoose.connect(config.MONGODB_URI, opts);

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (err) {
    cached.promise = null;
    cached.conn = null;
    throw err;
  }
}

export default connectToDatabase;
