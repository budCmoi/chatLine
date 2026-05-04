import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class ChatRequestDto {
  @IsString()
  @IsNotEmpty()
  conversationId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(4000)
  prompt!: string;

  @IsString()
  @IsNotEmpty()
  providerId!: string;

  @IsIn(['fast', 'expert'])
  mode!: 'fast' | 'expert';
}