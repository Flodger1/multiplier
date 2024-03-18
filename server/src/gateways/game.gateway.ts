import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { forwardRef, Inject } from '@nestjs/common';
import { GameService } from '../game/game.service';

@WebSocketGateway(8001, { cors: true })
export class GameGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => GameService)) private gameService: GameService,
  ) {}

  @SubscribeMessage('start_game')
  handleStartGame(client: any, data: any): void {
    this.gameService.startGame();
  }
}
