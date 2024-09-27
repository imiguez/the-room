import { OmitType, PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserWithoutEmailDto extends PartialType(
  OmitType(CreateUserDto, ['email'] as const),
) {
  @IsNotEmpty()
  @IsString()
  _id: string;
}
