import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateGenerationJobDto {
  @IsIn(['text', 'image', 'video', 'audio'])
  kind!: 'text' | 'image' | 'video' | 'audio';

  @IsString()
  @IsNotEmpty()
  providerId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  prompt!: string;

  @IsString()
  @IsNotEmpty()
  style!: string;
}