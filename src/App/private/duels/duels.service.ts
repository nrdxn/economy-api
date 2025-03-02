import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { DuelDto, Duels } from './db/DuelsModel';
import { Model, Types } from 'mongoose';
import { DuelCreateDto, DuelUpdateDto } from './dto/RequestDto';

@Injectable()
export class DuelsService {
    constructor (
        @InjectModel(Duels.name) private db: Model<DuelDto>
    ) {}

    async findByPlayerId (userId: string) {
        const duel = 
        (await this.db.findOne({
            opponent: userId
        }))
            ??
        (await this.db.findOne({
            requester: userId
        }));

        return duel;
    }

    async findByMessageId (messageId: string) {
        const duel = (await this.db.findOne({
            message: messageId
        }));

        return duel;
    }

    async createDuelInDb (dto: DuelCreateDto) {
        (await this.db.create({
            message: dto.message,
            opponent: dto.opponent,
            requester: dto.requester,
            amount: dto.amount
        }))
    }

    async deleteDuelInDb (messageId: string) {
        (await this.db.deleteOne({
            message: messageId
        }));
    }

    async updatePlayer (dto: DuelUpdateDto) {
        const duel = (await this.findByPlayerId(dto.userId));

        switch (dto.player) {
            case 'first': {
                duel.first.choice = dto.item;
                duel.first.selected = true;
                duel.markModified('first');
                
                await duel.save();
                break;
            }
            case 'second': {
                duel.second.choice = dto.item
                duel.markModified('second');

                await duel.save();
                break;
            }
        }
    }
}
