import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class AddLastTweetDTO {
  @IsNotEmpty()
  @IsString()
  postId!: string;

  @IsNotEmpty()
  @IsString()
  text!: string;

  @IsNotEmpty()
  @IsDate()
  createdAt!: Date;
}
