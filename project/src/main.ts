import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
import { AuthGuard } from './user/authGuard/auth.guard';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters( new HttpExceptionFilter());
  app.use(cookieParser())
  app.enableCors({
    origin:'http://localhost:3000',
    credentials:true})
  app.useGlobalGuards( new AuthGuard )
  await app.listen(process.env.SERVER);
}
bootstrap();
