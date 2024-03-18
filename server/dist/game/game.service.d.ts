import { GameGateway } from 'src/gateways/game.gateway';
import { BetService } from './services/bet.service';
import { PlayersService } from 'src/players/players.service';
export declare class GameService {
    private gameGateway;
    private betService;
    private readonly playersService;
    private gameInterval;
    private multiplier;
    private running;
    constructor(gameGateway: GameGateway, betService: BetService, playersService: PlayersService);
    placeBetsForBots(): void;
    startGame(): void;
    endGame(): void;
}
