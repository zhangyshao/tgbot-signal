import { Module } from '@nestjs/common';
import { modules } from './modules';
import { GlobalModule } from './modules/global/module';

@Module({
  imports: [
    GlobalModule,
    ...modules
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
