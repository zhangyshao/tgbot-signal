import { Global, Module } from '@nestjs/common';
import { LoggerService } from './services/Logger';

@Global()
@Module({
  providers: [
    LoggerService
  ],

  exports: [
    LoggerService
  ]
})

export class GlobalModule { }