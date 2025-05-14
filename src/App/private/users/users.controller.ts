import { Controller, Get, Req, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';
import { LeaderboardSortType } from './dto/RequestsDto';
import BaseController from '@Core/BaseController';

@Controller('users')
export class UsersController extends BaseController {
    constructor(private readonly usersService: UsersService) {
        super();
    }

    @Get(':id')
    async findOrCreateUser(@Req() req: Request) {
        const checkAuth = this.checkAuth(req);
        if (checkAuth) return checkAuth;

        return await this.usersService.findOrCreateById(req.params.id);
    }

    @Get('get/leaderboard')
    async getLeaderboardByType(
        @Req() req: Request,
        @Query('type') type: string,
        @Query('currentUser') currentUser: string
    ) {
        const checkAuth = this.checkAuth(req);
        if (checkAuth) return checkAuth;

        return await this.usersService.getLeaderboardByType({
            type: type as LeaderboardSortType,
            currentUser: currentUser
        });
    }

    @Put(':id/update-balance')
    async updateUserBalance(@Req() req: Request) {
        const checkAuth = this.checkAuth(req);
        if (checkAuth) return checkAuth;

        return await this.usersService.updateUserBalance(
            req.params.id,
            req.body
        );
    }

    @Put(':id/timely')
    async timelyAward(@Req() req: Request) {
        const checkAuth = this.checkAuth(req);
        if (checkAuth) return checkAuth;

        return await this.usersService.timelyAward(req.params.id);
    }

    @Put(':id/timely-notifications')
    async updateTimelyNotifications(@Req() req: Request) {
        const checkAuth = this.checkAuth(req);
        if (checkAuth) return checkAuth;

        return await this.usersService.updateTimelyNotifications(req.params.id);
    }

    @Put(':id/update-invites')
    async updateInvites(@Req() req: Request) {
        const checkAuth = this.checkAuth(req);
        if (checkAuth) return checkAuth;

        return await this.usersService.updateInvites(req.params.id);
    }

    @Put(':id/update-online')
    async updateOnline(@Req() req: Request) {
        const checkAuth = this.checkAuth(req);
        if (checkAuth) return checkAuth;

        return await this.usersService.updateUserBalance(
            req.params.id,
            req.body
        );
    }
}
