/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MicroservicesController } from './microservices.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'GEA_QUEUE',
        useFactory: (configService: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.get<string>('RABBIT_MQ_URI')],
            queue: 'generate_gea_protocol',
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [MicroservicesController],
  providers: [RabbitMQService],
  exports: [RabbitMQService],
})
export class MicroServicesModule {}
