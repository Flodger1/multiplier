import { PlaceBetDto } from '../dto/place-bet.dto';
import { PlayersService } from '../../players/players.service';
export declare class BetService {
    private readonly playersService;
    private bets;
    constructor(playersService: PlayersService);
    clearBets(): void;
    getRoundResults(multiplier: number): {
        name: string;
        win: boolean;
        winAmount: number;
        betMultiplier: number;
    }[];
    placeBet(placeBetDto: PlaceBetDto): void;
    calculateResultsForCurrentRound(finalMultiplier: number): any[];
    settleBets(finalMultiplier: number): void;
}
