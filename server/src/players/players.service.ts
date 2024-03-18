/* eslint-disable*/
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';

import { JwtService } from '@nestjs/jwt';
import { EventsGateway } from 'src/gateways/events.gateway';
import { UpdatePlayerDto } from './dto/update-player.dto';

@Injectable()
export class PlayersService {
  private players = [
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

  constructor(
    private readonly jwtService: JwtService,
    private readonly eventsGateway: EventsGateway,
  ) {}

  getBots() {
    return this.players.filter((player) => player.name.startsWith('Bot'));
  }

  updateOnePlayer(id: number, updatePlayerDto: UpdatePlayerDto) {
    const playerIndex = this.players.findIndex((p) => p.id === id);
    if (playerIndex === -1) {
      throw new NotFoundException('Player not found');
    }
    this.players[playerIndex].points = updatePlayerDto.points;
    return this.players[playerIndex];
  }
  getPlayers() {
    return this.players;
  }

  getOnePlayer(id: number) {
    const player = this.players.find((player) => player.id === Number(id));
    return player;
  }
  createPlayer(createPlayerDto: CreatePlayerDto) {
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

  updatePlayerPoints(playerId: number, change: { points: number }) {
    const player = this.getOnePlayer(playerId);
    if (!player) {
      throw new Error('Player not found');
    }
    player.points += change.points;
  }

  updatePlayerPointsAndScore(
    playerId: number,
    changeInPoints: number,
    betResult: number,
  ) {
    const player = this.getOnePlayer(playerId);
    if (!player) {
      throw new Error('Player not found');
    }

    player.points = Math.max(player.points + changeInPoints, 0);

    if (betResult > 0) {
      player.score += betResult;
    }
  }
}
