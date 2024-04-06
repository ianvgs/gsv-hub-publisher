/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
/* import { lastValueFrom } from 'rxjs'; */

//SOMENTE CLIENT.EMIT('billing_created',{})
//RECEBE DO OUTRO LADO NA CONTROLLER =>  @EventPattern('billing_created')
@Injectable()
export class RabbitMQService {
  constructor(
    @Inject('GEA_QUEUE') private readonly rmqClient: ClientProxy,
    private readonly httpService: HttpService,
  ) {}

  generateGeaProtocol() {
    //Mais utilizados pra transmitir dados
    this.rmqClient.emit('gsv_nr_created', {
      gsv_id: '123',
    });
    return 'rmqCreated';
  }
  //this.rabbitMQService.createNewsConfig({ pattern: "tag_created", name: "", value: "" })
}
