import app from './app';
import { config } from './config';
import { connectDB } from './config/db';

async function bootstrap(): Promise<void> {
  try {
    await connectDB();
    // eslint-disable-next-line no-console
    console.log('[db] connected');
    app.listen(config.port, () => {
      // eslint-disable-next-line no-console
      console.log(`[server] listening on http://localhost:${config.port}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[server] failed to start:', error);
    process.exit(1);
  }
}

void bootstrap();
