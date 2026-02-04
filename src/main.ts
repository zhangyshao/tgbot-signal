import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config()
async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.SERVER_PORT || 3000);

  console.log("listening at: ", await app.getUrl())
}
bootstrap();
