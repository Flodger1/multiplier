import { Server } from 'socket.io';
import { GameService } from '../game/game.service';
export declare class GameGateway {
    private gameService;
    server: Server;
    constructor(gameService: GameService);
    handleStartGame(client: any, data: any): void;
}
