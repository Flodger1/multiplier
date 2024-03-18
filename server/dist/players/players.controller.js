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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayersController = void 0;
const common_1 = require("@nestjs/common");
const players_service_1 = require("./players.service");
const create_player_dto_1 = require("./dto/create-player.dto");
const update_player_dto_1 = require("./dto/update-player.dto");
const update_player_points_dto_1 = require("./dto/update-player-points.dto");
let PlayersController = class PlayersController {
    constructor(playersService) {
        this.playersService = playersService;
    }
    getOnePlayer(id) {
        try {
            return this.playersService.getOnePlayer(id);
        }
        catch (error) {
            throw Error(error);
        }
    }
    getPlayers() {
        return this.playersService.getPlayers();
    }
    createPlayer(createPlayerDto) {
        return this.playersService.createPlayer(createPlayerDto);
    }
    updateOnePlayer(id, updatePlayerDto) {
        return this.playersService.updateOnePlayer(id, updatePlayerDto);
    }
    updatePlayerPoints(id, updatePlayerPointsDto) {
        return this.playersService.updatePlayerPoints(id, updatePlayerPointsDto);
    }
};
exports.PlayersController = PlayersController;
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "getOnePlayer", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "getPlayers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_player_dto_1.CreatePlayerDto]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "createPlayer", null);
__decorate([
    (0, common_1.Put)('player/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_player_dto_1.UpdatePlayerDto]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "updateOnePlayer", null);
__decorate([
    (0, common_1.Put)('player/points/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, update_player_points_dto_1.UpdatePlayerPointsDto]),
    __metadata("design:returntype", void 0)
], PlayersController.prototype, "updatePlayerPoints", null);
exports.PlayersController = PlayersController = __decorate([
    (0, common_1.Controller)('players'),
    __metadata("design:paramtypes", [players_service_1.PlayersService])
], PlayersController);
//# sourceMappingURL=players.controller.js.map