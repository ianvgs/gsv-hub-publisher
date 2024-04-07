/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { SolrmoduleModule } from './solrmodule/solrmodule.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: false,
      isGlobal: true,
    }),
    /*     RedisModule.register({
      name:'authRedis',
      url: `redis://@${process.env.REDIS_SERVER}:${process.env.REDIS_PORT || 6379}`,
    }), */
    SolrmoduleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
