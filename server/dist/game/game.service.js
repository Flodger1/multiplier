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
exports.GameService = void 0;
const common_1 = require("@nestjs/common");
const game_gateway_1 = require("../gateways/game.gateway");
const bet_service_1 = require("./services/bet.service");
const players_service_1 = require("../players/players.service");
let GameService = class GameService {
    constructor(gameGateway, betService, playersService) {
        this.gameGateway = gameGateway;
        this.betService = betService;
        this.playersService = playersService;
        this.multiplier = 1;
        this.running = false;
    }
    placeBetsForBots() {
        const bots = this.playersService.getBots();
        const botBets = bots.map((bot) => {
            const betAmount = Math.floor(Math.random() * 100) + 50;
            const betMultiplier = parseFloat((Math.floor(Math.random() * 10) + 1.5).toFixed(2));
            const betDto = {
                playerId: bot.id,
                betAmount: betAmount,
                betMultiplier: betMultiplier,
            };
            this.betService.placeBet(betDto);
            return {
                name: bot.name,
                betAmount: betAmount,
                betMultiplier: betMultiplier,
            };
        });
    }
    startGame() {
        console.log('Start');
        if (this.running)
            return;
        this.running = true;
        this.multiplier = 0.0;
        this.betService.clearBets();
        this.gameGateway.server.emit('game_started', {
            multiplier: this.multiplier,
        });
        this.placeBetsForBots();
        this.gameInterval = setInterval(() => {
            this.multiplier += 0.01;
            console.log(this.multiplier.toFixed(2));
            this.gameGateway.server.emit('multiplier_update', {
                multiplier: this.multiplier.toFixed(2),
            });
        }, 10);
        const randomTime = Math.random() * 5000;
        setTimeout(() => this.endGame(), randomTime);
    }
    endGame() {
        console.log('End');
        clearInterval(this.gameInterval);
        const results = this.betService.calculateResultsForCurrentRound(this.multiplier);
        this.gameGateway.server.emit('current_round_results', results);
        this.betService.settleBets(this.multiplier);
        const players = this.playersService.getPlayers();
        players.forEach((player) => {
            this.gameGateway.server.emit('balance_updated', {
                playerId: player.id,
                points: player.points,
            });
        });
        const botResults = this.betService.getRoundResults(this.multiplier);
        console.log('Players', players);
        this.gameGateway.server.emit('update_ranking', players);
        this.gameGateway.server.emit('current_round_results', botResults);
        this.gameGateway.server.emit('game_ended', {
            multiplier: this.multiplier.toFixed(2),
        });
        this.running = false;
    }
};
exports.GameService = GameService;
exports.GameService = GameService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [game_gateway_1.GameGateway,
        bet_service_1.BetService,
        players_service_1.PlayersService])
], GameService);
//# sourceMappingURL=game.service.js.map