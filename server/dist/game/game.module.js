"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameModule = void 0;
const common_1 = require("@nestjs/common");
const game_service_1 = require("./game.service");
const game_gateway_1 = require("../gateways/game.gateway");
const bet_service_1 = require("./services/bet.service");
const players_module_1 = require("../players/players.module");
const game_controller_1 = require("./game.controller");
let GameModule = class GameModule {
};
exports.GameModule = GameModule;
exports.GameModule = GameModule = __decorate([
    (0, common_1.Module)({
        controllers: [game_controller_1.GameController],
        providers: [game_service_1.GameService, game_gateway_1.GameGateway, bet_service_1.BetService],
        exports: [game_service_1.GameService, game_gateway_1.GameGateway, bet_service_1.BetService],
        imports: [players_module_1.PlayersModule],
    })
], GameModule);
;
//# sourceMappingURL=game.module.js.map