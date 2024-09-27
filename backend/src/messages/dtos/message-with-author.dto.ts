import { IsDateString, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { UserWithoutEmailDto } from 'src/users/dtos/user-without-email.dto';

export class MessageWithAuthorDto {
  @IsNotEmpty()
  @IsString()
  _id: string;
  @IsNotEmpty()
  @IsString()
  content: string;
  @IsNotEmpty()
  @IsDateString()
  date: Date;
  @IsNotEmpty()
  @IsObject()
  author: UserWithoutEmailDto;
}
