import { CreatePlayerDto } from './dto/create-player.dto';
import { JwtService } from '@nestjs/jwt';
import { EventsGateway } from 'src/gateways/events.gateway';
import { UpdatePlayerDto } from './dto/update-player.dto';
export declare class PlayersService {
    private readonly jwtService;
    private readonly eventsGateway;
    private players;
    constructor(jwtService: JwtService, eventsGateway: EventsGateway);
    getBots(): {
        id: number;
        name: string;
        points: number;
        score: number;
        message: string;
        currentRoundResult: {};
    }[];
    updateOnePlayer(id: number, updatePlayerDto: UpdatePlayerDto): {
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
    getOnePlayer(id: number): {
        id: number;
        name: string;
        points: number;
        score: number;
        message: string;
        currentRoundResult: {};
    };
    createPlayer(createPlayerDto: CreatePlayerDto): {
        token: string;
        id: number;
        points: number;
        score: number;
        message: string;
        currentRoundResult: {};
        name: string;
    };
    updatePlayerPoints(playerId: number, change: {
        points: number;
    }): void;
    updatePlayerPointsAndScore(playerId: number, changeInPoints: number, betResult: number): void;
}
