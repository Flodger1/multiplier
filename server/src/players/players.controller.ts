import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { UpdatePlayerPointsDto } from './dto/update-player-points.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Get(':id')
  getOnePlayer(@Param('id') id: number) {
    try {
      return this.playersService.getOnePlayer(id);
    } catch (error) {
      throw Error(error);
    }
  }
  @Get()
  getPlayers() {
    return this.playersService.getPlayers();
  }

  @Post()
  createPlayer(@Body(new ValidationPipe()) createPlayerDto: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @Put('player/:id')
  updateOnePlayer(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ) {
    return this.playersService.updateOnePlayer(id, updatePlayerDto);
  }

  @Put('player/points/:id')
  updatePlayerPoints(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePlayerPointsDto: UpdatePlayerPointsDto,
  ) {
    return this.playersService.updatePlayerPoints(id, updatePlayerPointsDto);
  }
}
