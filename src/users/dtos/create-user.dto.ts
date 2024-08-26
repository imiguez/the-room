import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: number;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsString()
  imageUrl: string;
}
