/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Query,
  UnauthorizedException,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { SolrService } from './services/solr.service';

import { Request } from 'express';
import { UserService } from './services/user.service';
/* import { RedisService } from 'nestjs-redis'; */

@Controller('solr')
export class SolrController {
  constructor(
    private readonly solrService: SolrService,
    private readonly userService: UserService,
    /*     private readonly redisService: RedisService, */
  ) {}

  @Get('search')
  async search(
    @Query('q') query: string,
    @Req() request: Request,
  ): Promise<any> {
    let user: any;
    console.log('Chamou');
 
    request.cookies['BBSSOToken'] =
      'DABTiyd_jOKnwRekl8Ze0w-RYmM.*AAJTSQACMDMAAlNLABxuU1R0Ty92M2M4d2RCUDdGNGQ5d3NlZzJqNDA9AAR0eXBlAANDVFMAAlMxAAIwNw..*';

    //tenta achar o usuario no redis pelo request.cookies['BBSSOToken']
    /*     const client = await this.redisService.getClient('authRedis');
    const resposta = await client.get(request.cookies['BBSSOToken']); */

    try {
      if (request.cookies['BBSSOToken'] != undefined) {
        user = await this.userService.getUser(request.cookies['BBSSOToken']);
        /*     client.setex(request.cookies['BBSSOToken'], 60 * 30, user); */
      } else {
        throw new UnauthorizedException(
          'Não foi possivel encontrar cookie na requisição.',
        );
      }
    } catch (error) {
      if (error.message == 'Request failed with status code 401') {
        throw new UnauthorizedException('Cookie expirado ou invalido!');
      } else {
        throw new BadRequestException(
          `Problemas no cookie! \n mensagem: ${error.message}`,
        );
      }
    }

    return await this.solrService.search(query, user);
  }
}
