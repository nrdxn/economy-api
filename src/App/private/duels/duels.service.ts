import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Duels } from '@/app/private/duels/db/DuelsModel';

@Injectable()
export class DuelsService {
    constructor(@InjectModel(Duels.name) private db: Model<DuelDto>) {}

    public async findByPlayerId(userID: string) {
        return (
            (await this.db.findOne({
                opponent: userID
            })) ??
            (await this.db.findOne({
                requester: userID
            }))
        );
    }

    public async findByMessageId(messageId: string) {
        return await this.db.findOne({
            message: messageId
        });
    }

    public async createDuelInDb(dto: DuelCreateDto) {
        await this.db.create({
            message: dto.message,
            opponent: dto.opponent,
            requester: dto.requester,
            amount: dto.amount
        });
    }

    public async deleteDuelInDb(messageId: string) {
        await this.db.deleteOne({
            message: messageId
        });
    }

    public async updatePlayer(dto: DuelUpdateDto) {
        const duel = await this.findByPlayerId(dto.userID);

        switch (dto.player) {
            case 'first': {
                duel.first.choice = dto.item;
                duel.first.selected = true;
                duel.markModified('first');
                break;
            }
            case 'second': {
                duel.second.choice = dto.item;
                duel.markModified('second');
                break;
            }
        }

        await duel.save();
    }
}
