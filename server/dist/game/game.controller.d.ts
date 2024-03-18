import { PlaceBetDto } from './dto/place-bet.dto';
import { BetService } from './services/bet.service';
export declare class GameController {
    private readonly betService;
    constructor(betService: BetService);
    placeBet(placeBetDto: PlaceBetDto): void;
}
