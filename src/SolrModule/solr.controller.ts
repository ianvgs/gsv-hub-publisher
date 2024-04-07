/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UnauthorizedException,
  BadRequestException,
  Req,
} from '@nestjs/common';
import { SolrService } from './services/solr.service';

import { Request } from 'express';
import { UserService } from './services/user.service';
import { UserDto } from 'src/dto/usert.dto';

@Controller('solr')
export class SolrController {
  constructor(
    private readonly solrService: SolrService,
    private readonly userService: UserService,
  ) {}

  @Get('search')
  async search(
    @Query('q') query: string,
    @Req() request: Request,
  ): Promise<any> {
    let user: any;

    //tenta achar o usuario no redis pelo request.cookies['BBSSOToken']
    //Se tiver já roda as queries

    try {
      if (request.cookies['BBSSOToken'] != undefined) {
        user = await this.userService.getUser(request.cookies['BBSSOToken']);
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
