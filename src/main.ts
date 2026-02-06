import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { TimeoutInterceptor } from './common/interceptors/timeout';
import { TransformInterceptor } from './common/interceptors/res.transform';
import { validationPipe } from './common/config/class-valid';

dotenv.config()
async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api')
  app.useGlobalInterceptors(new TimeoutInterceptor())
  app.useGlobalInterceptors(new TransformInterceptor())
  app.useGlobalPipes(validationPipe)

  await app.listen(process.env.SERVER_PORT || 3000);

  console.log("listening at: ", await app.getUrl())
}
bootstrap();
