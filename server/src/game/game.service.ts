import { Injectable } from '@nestjs/common';
import { GameGateway } from 'src/gateways/game.gateway';
import { BetService } from './services/bet.service';
import { PlayersService } from 'src/players/players.service';
import { PlaceBetDto } from './dto/place-bet.dto';

@Injectable()
export class GameService {
  private gameInterval: ReturnType<typeof setInterval>;
  private multiplier = 1;
  private running = false;

  constructor(
    private gameGateway: GameGateway,
    private betService: BetService,
    private readonly playersService: PlayersService,
  ) {}

  placeBetsForBots() {
    const bots = this.playersService.getBots();
    const botBets = bots.map((bot) => {
      const betAmount = Math.floor(Math.random() * 100) + 50;
      const betMultiplier = parseFloat(
        (Math.floor(Math.random() * 10) + 1.5).toFixed(2),
      );

      const betDto: PlaceBetDto = {
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
    if (this.running) return;
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

    const results = this.betService.calculateResultsForCurrentRound(
      this.multiplier,
    );
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
}
