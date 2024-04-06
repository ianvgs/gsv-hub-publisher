/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';

export class CreateAnimalRequest {
  @IsNotEmpty({ message: 'Must be informed the name of the aniaml.' })
  name: string;

  @IsNotEmpty({ message: 'Must be informed the specimen of the animal.' })
  specimen: string;
}
