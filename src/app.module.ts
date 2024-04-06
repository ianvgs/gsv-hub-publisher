/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MicroServicesModule } from './MicroServicesModule/microservices.module';
import { ConfigModule } from '@nestjs/config';
import { SolrmoduleModule } from './solrmodule/solrmodule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
    }),
    MicroServicesModule,
    SolrmoduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
