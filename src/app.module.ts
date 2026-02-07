import { Module } from '@nestjs/common';
import { modules } from './modules';
import { GlobalModule } from './modules/global/module';
import { APP_FILTER } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/filters/global';

@Module({
  imports: [
    GlobalModule,
    ...modules
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter
    },
  ],
})
export class AppModule { }
