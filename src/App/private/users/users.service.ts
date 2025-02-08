import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDto } from './db/UserModel';
import { Model } from 'mongoose';
import { BalanceUpdateDto, OnlineUpdateDto } from './db/RequestsDto';
import ms from 'ms';

@Injectable()
export class UsersService {
    constructor (
        @InjectModel(User.name) private db: Model<UserDto>,
    ) {}

    async findOrCreateById (id: string) {
        let user = (await this.db.findOne({
            user: id
        }))

        if (!user) user = await this.db.create({
            user: id
        })

        return user
    }

    async updateUserBalance (id: string, dto: BalanceUpdateDto) {
        const user = await this.findOrCreateById(id)

        switch (dto.type) {
            case 'minus': {
                user.balance -= dto.balance
                user.save()

                break
            }
            case 'plus': {
                user.balance += dto.balance
                user.save()

                break
            }
        }
    }

    async timelyAward (id: string) {
        const user = await this.findOrCreateById(id)
        
        user.timelyKd = Date.now() + ms('12h')
        user.timely = true
        user.balance += 50

        user.save()
    }

    async updateTimelyNotifications (id: string) {
        const user = await this.findOrCreateById(id)

        user.timelyNotifications = !user.timelyNotifications
        user.save()
    }

    async updateInvites (id: string) {
        const user = await this.findOrCreateById(id)

        user.balance += 50
        user.invites++
        user.earnFromInvites += 50

        user.save()
    }

    async updateOnline (id: string, dto: OnlineUpdateDto) {
        const user = await this.findOrCreateById(id)

        user.generalVoice += dto.time
        user.weekVoice += dto.time
        user.balance += Math.floor(dto.time / 60000)
        
        await user.save()
    }
}
