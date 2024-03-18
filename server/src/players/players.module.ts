import { Module } from '@nestjs/common';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';

import { JwtModule } from '@nestjs/jwt';
import { EventsGateway } from 'src/gateways/events.gateway';

@Module({
  imports: [
    JwtModule.register({
      secret: 'yourSecretKey',
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [PlayersController],
  providers: [PlayersService, EventsGateway],
  exports: [PlayersService],
})
export class PlayersModule {}
