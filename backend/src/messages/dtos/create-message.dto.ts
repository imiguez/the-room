import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  text: string;
  @IsNotEmpty()
  @IsString()
  author: string;
}
