import { Injectable } from '@nestjs/common';
import { PlaceBetDto } from '../dto/place-bet.dto';
import { Bet } from '../entities/bet.entity';

import { PlayersService } from '../../players/players.service';

@Injectable()
export class BetService {
  private bets: Bet[] = [];

  constructor(private readonly playersService: PlayersService) {}

  clearBets() {
    this.bets = [];
  }

  getRoundResults(multiplier: number) {
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

  placeBet(placeBetDto: PlaceBetDto) {
    const bet: Bet = {
      playerId: placeBetDto.playerId,
      betAmount: placeBetDto.betAmount,
      betMultiplier: placeBetDto.betMultiplier,

    };
    this.bets.push(bet);

  }
  calculateResultsForCurrentRound(finalMultiplier: number) {

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

  settleBets(finalMultiplier: number) {
    this.bets.forEach((bet) => {
      let changeInPoints = 0;
      let betResult = 0;

      if (bet.betMultiplier <= finalMultiplier) {
        const winAmount = bet.betAmount * bet.betMultiplier;
        changeInPoints = winAmount;
        betResult = winAmount;
      } else {
        changeInPoints = -bet.betAmount;
        betResult = -bet.betAmount;
      }

      this.playersService.updatePlayerPointsAndScore(
        bet.playerId,
        changeInPoints,
        betResult,
      );
    });
  }

}
