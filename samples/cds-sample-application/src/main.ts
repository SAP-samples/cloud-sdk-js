import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cds = require('@sap/cds');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await cds.connect.to('db');
  await cds
  .serve('all')
  .in(app);
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
