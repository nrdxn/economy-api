import { Controller, Get, Req, Put } from '@nestjs/common';
import { DuelsService } from './duels.service';
import { Request } from 'express';
import BaseController from '@Core/BaseController';

@Controller('duels')
export class DuelsController extends BaseController {
  constructor (
    private readonly duelsService: DuelsService
  ) { super() }

  @Get('player/:id')
  async findDuelByPlayerId (@Req() req: Request) {
    const checkAuth = this.checkAuth(req);
    if (checkAuth) return checkAuth;

    return (await this.duelsService.findByPlayerId(req.params.id));
  }

  @Get('message/:id')
  async findDuelByMessageId (@Req() req: Request) {
    const checkAuth = this.checkAuth(req);
    if (checkAuth) return checkAuth;

    return (await this.duelsService.findByMessageId(req.params.id));
  }

  @Put('create')
  async createDuel (@Req() req: Request) {
    const checkAuth = this.checkAuth(req);
    if (checkAuth) return checkAuth;

    return (await this.duelsService.createDuelInDb(req.body));
  }

  @Put('update')
  async updateDuel (@Req() req: Request) {
    const checkAuth = this.checkAuth(req);
    if (checkAuth) return checkAuth;

    return (await this.duelsService.updatePlayer(req.body));
  }

  @Put('delete/:id')
  async deleteDuelByMessageId (@Req() req: Request) {
    const checkAuth = this.checkAuth(req);
    if (checkAuth) return checkAuth;

    return (await this.duelsService.deleteDuelInDb(req.params.id));
  }

}
