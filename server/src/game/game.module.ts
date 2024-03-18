import { forwardRef, Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameGateway } from '../gateways/game.gateway';
import { BetService } from './services/bet.service';
import { PlayersModule } from 'src/players/players.module';
import { GameController } from './game.controller';

@Module({
  controllers: [GameController],
  providers: [GameService, GameGateway, BetService],
  exports: [GameService, GameGateway, BetService],
  imports: [PlayersModule],
})
export class GameModule {};