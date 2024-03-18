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
exports.BetService = void 0;
const common_1 = require("@nestjs/common");
const players_service_1 = require("../../players/players.service");
let BetService = class BetService {
    constructor(playersService) {
        this.playersService = playersService;
        this.bets = [];
    }
    clearBets() {
        this.bets = [];
    }
    getRoundResults(multiplier) {
        return this.bets.map((bet) => {
            const win = bet.betMultiplier <= multiplier;
            const winAmount = win ? bet.betAmount * bet.betMultiplier : 0;
            const player = this.playersService.getOnePlayer(bet.playerId);
            return {
                name: player.name,
                win,
                winAmount,
                betMultiplier: bet.betMultiplier,
            };
        });
    }
    placeBet(placeBetDto) {
        const bet = {
            playerId: placeBetDto.playerId,
            betAmount: placeBetDto.betAmount,
            betMultiplier: placeBetDto.betMultiplier,
        };
        this.bets.push(bet);
    }
    calculateResultsForCurrentRound(finalMultiplier) {
        const currentRoundResults = [];
        this.bets.forEach((bet) => {
            const player = this.playersService.getOnePlayer(bet.playerId);
            if (player) {
                const won = bet.betMultiplier <= finalMultiplier;
                const result = won ? bet.betAmount * finalMultiplier : 0;
                currentRoundResults.push({
                    playerId: player.id,
                    betAmount: bet.betAmount,
                    betMultiplier: bet.betMultiplier,
                    won,
                    result,
                });
            }
        });
        return currentRoundResults;
    }
    settleBets(finalMultiplier) {
        this.bets.forEach((bet) => {
            let changeInPoints = 0;
            let betResult = 0;
            if (bet.betMultiplier <= finalMultiplier) {
                const winAmount = bet.betAmount * bet.betMultiplier;
                changeInPoints = winAmount;
                betResult = winAmount;
            }
            else {
                changeInPoints = -bet.betAmount;
                betResult = -bet.betAmount;
            }
            this.playersService.updatePlayerPointsAndScore(bet.playerId, changeInPoints, betResult);
        });
    }
};
exports.BetService = BetService;
exports.BetService = BetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [players_service_1.PlayersService])
], BetService);
//# sourceMappingURL=bet.service.js.map