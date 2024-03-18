import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GameService } from './game.service';

import { PlaceBetDto } from './dto/place-bet.dto';
import { BetService } from './services/bet.service';


@Controller('game')
export class GameController {
  constructor(private readonly betService: BetService) {}

  @Post('bet')
  placeBet(@Body() placeBetDto: PlaceBetDto) {
    return this.betService.placeBet(placeBetDto);
  }
}
