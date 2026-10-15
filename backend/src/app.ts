import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import apiRoutes from './routes';
import { config } from './config/env';

export const app = express();

// Security and CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or server-to-server)
      if (!origin) return callback(null, true);
      // In development or with local clients, accept origin
      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Standard body and cookie parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Request logger in non-production
if (config.NODE_ENV !== 'production') {
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[API] ${req.method} ${req.originalUrl}`);
    next();
  });
}

// Mount all API endpoints under /api and root for serverless compatibility
app.use('/api', apiRoutes);
app.use('/', apiRoutes);

// Root greeting / health check
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    name: 'Brian Jamison Real Estate CMS API',
    status: 'online',
    version: '1.0.0',
    documentation: '/api/health',
  });
});

// 404 Fallback
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// Global Error Handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Unhandled Server Error]', err);
  res.status(500).json({
    success: false,
    error: err?.message || 'Internal server error',
  });
});

export default app;
