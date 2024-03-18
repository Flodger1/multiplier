import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-player.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {
  id?: number;
  name?: string;
  points?: number;
  score?: number;
  message?: string;
}
