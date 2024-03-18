"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const events_gateway_1 = require("../gateways/events.gateway");
let PlayersService = class PlayersService {
    constructor(jwtService, eventsGateway) {
        this.jwtService = jwtService;
        this.eventsGateway = eventsGateway;
        this.players = [
            {
                id: 1,
                name: 'Bot1',
                points: 1000,
                score: 0,
                message: 'I hane no idea how to play',
                currentRoundResult: {},
            },
            {
                id: 2,
                name: 'Bot2',
                points: 1000,
                score: 0,
                message: 'I will win today',
                currentRoundResult: {},
            },
            {
                id: 3,
                name: 'Bot3',
                points: 1000,
                score: 0,
                message: 'I will win a lot',
                currentRoundResult: {},
            },
        ];
    }
    getBots() {
        return this.players.filter((player) => player.name.startsWith('Bot'));
    }
    updateOnePlayer(id, updatePlayerDto) {
        const playerIndex = this.players.findIndex((p) => p.id === id);
        if (playerIndex === -1) {
            throw new common_1.NotFoundException('Player not found');
        }
        this.players[playerIndex].points = updatePlayerDto.points;
        return this.players[playerIndex];
    }
    getPlayers() {
        return this.players;
    }
    getOnePlayer(id) {
        const player = this.players.find((player) => player.id === Number(id));
        return player;
    }
    createPlayer(createPlayerDto) {
        const newPlayer = {
            ...createPlayerDto,
            id: Date.now(),
            points: 1500,
            score: 0,
            message: 'Default message',
            currentRoundResult: {},
        };
        this.players.push(newPlayer);
        const token = this.jwtService.sign({
            id: newPlayer.id,
            name: newPlayer.name,
        });
        console.log(token);
        this.eventsGateway.broadcast('playerCreated', newPlayer);
        return { ...newPlayer, token };
    }
    updatePlayerPoints(playerId, change) {
        const player = this.getOnePlayer(playerId);
        if (!player) {
            throw new Error('Player not found');
        }
        player.points += change.points;
    }
    updatePlayerPointsAndScore(playerId, changeInPoints, betResult) {
        const player = this.getOnePlayer(playerId);
        if (!player) {
            throw new Error('Player not found');
        }
        player.points = Math.max(player.points + changeInPoints, 0);
        if (betResult > 0) {
            player.score += betResult;
        }
    }
};
exports.PlayersService = PlayersService;
exports.PlayersService = PlayersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        events_gateway_1.EventsGateway])
], PlayersService);
//# sourceMappingURL=players.service.js.map