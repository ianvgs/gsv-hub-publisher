/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroServicesModule } from './MicroServicesModule/microservices.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
    }),
    MicroServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
