import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { UpdatePlayerPointsDto } from './dto/update-player-points.dto';
export declare class PlayersController {
    private readonly playersService;
    constructor(playersService: PlayersService);
    getOnePlayer(id: number): {
        id: number;
        name: string;
        points: number;
        score: number;
        message: string;
        currentRoundResult: {};
    };
    getPlayers(): {
        id: number;
        name: string;
        points: number;
        score: number;
        message: string;
        currentRoundResult: {};
    }[];
    createPlayer(createPlayerDto: CreatePlayerDto): {
        token: string;
        id: number;
        points: number;
        score: number;
        message: string;
        currentRoundResult: {};
        name: string;
    };
    updateOnePlayer(id: number, updatePlayerDto: UpdatePlayerDto): {
        id: number;
        name: string;
        points: number;
        score: number;
        message: string;
        currentRoundResult: {};
    };
    updatePlayerPoints(id: number, updatePlayerPointsDto: UpdatePlayerPointsDto): void;
}
