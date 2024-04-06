/* eslint-disable prettier/prettier */
import { Controller, Post } from '@nestjs/common';
/* import { CreateAnimalRequest } from './dto/create-animal-request.dto'; */
import { RabbitMQService } from './rabbitmq.service';

@Controller('microservices')
export class MicroservicesController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @Post('/billing')
  createBillings() {
    return this.rabbitMQService.generateGeaProtocol();
  }
}
