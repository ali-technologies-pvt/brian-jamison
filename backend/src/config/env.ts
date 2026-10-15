import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

export const config = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  JWT_SECRET: process.env.JWT_SECRET || 'brian_jamison_okc_inline_editor_secret_jwt_key_2026_secure',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://imranaminrankorbit_db_user:OmmjcNTL61RKXi99@cluster0.buqsxvg.mongodb.net',
  ADMIN_USERNAME: process.env.ADMIN_USERNAME || 'Admin',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || '#Imthepassword@123#',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  COOKIE_NAME: 'admin_token',
};
