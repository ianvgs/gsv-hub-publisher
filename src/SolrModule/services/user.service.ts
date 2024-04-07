/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/usert.dto';
import axiosNest from 'src/utils/axios';

@Injectable()
export class UserService {
  async getUser(bbToken: string): Promise<UserDto> {
    const data = await axiosNest.get('https://portal.diope.bb.com.br/auth', {
      headers: { Cookie: `BBSSOToken=${bbToken}` },
    });

    return data.data;
  }
}
