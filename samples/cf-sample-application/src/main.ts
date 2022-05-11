import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JWTStrategy } from '@sap/xssec';
import { getServices } from '@sap/xsenv';
import * as passport from 'passport';

// Use the same xsuaa across the entire application
const xsuaa = getServices({ xsuaa: { name: '<REPLACE-ME>-xsuaa-service' } }).xsuaa;
passport.use(new JWTStrategy(xsuaa));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(passport.initialize());
  app.use(passport.authenticate('JWT', { session: false }));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
