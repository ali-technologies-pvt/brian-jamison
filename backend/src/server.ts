import { app } from './app';
import { config } from './config/env';
import { connectToDatabase } from './lib/mongodb';

async function startServer() {
  // Proactively attempt database connection (gracefully degrades to local fallback if offline)
  try {
    await connectToDatabase();
    console.log('📦 Connected to MongoDB successfully.');
  } catch (err: any) {
    console.warn(`⚠️  MongoDB connection note: ${err?.message || 'deferred'}. Using local JSON cache fallback.`);
  }

  const server = app.listen(config.PORT, () => {
    console.log(`🚀 Brian Jamison Backend API running on http://localhost:${config.PORT}`);
    console.log(`👉 Health check: http://localhost:${config.PORT}/api/health`);
    console.log(`👉 Auth endpoints: http://localhost:${config.PORT}/api/auth/login, /me, /logout`);
    console.log(`👉 Content endpoints: http://localhost:${config.PORT}/api/content, /update`);
  });

  // Graceful shutdown handling
  const shutdown = () => {
    console.log('Shutting down server gracefully...');
    server.close(() => {
      console.log('Server closed.');
      process.exit(0);
    });
  };

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
}

startServer();
