import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayersModule } from './players/players.module';
import { EventsGateway } from './gateways/events.gateway';
import { ChatGateway } from './chat/chat.gateway';
import { GameModule } from './game/game.module';

@Module({
  imports: [PlayersModule, GameModule],
  controllers: [AppController],
  providers: [AppService, EventsGateway, ChatGateway],
})
export class AppModule {}