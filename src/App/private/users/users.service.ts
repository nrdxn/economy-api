import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '@/app/private/users/db/UserModel';
import { CoinEmoji } from '../../../config';
import ms from 'ms';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private db: Model<UserDto>) {}

    public async findOrCreateById(userID: string) {
        let user = await this.db.findOne({
            user: userID
        });

        if (!user)
            user = await this.db.create({
                user: userID
            });

        return user;
    }

    public async updateUserBalance(userID: string, dto: BalanceUpdateDto) {
        const user = await this.findOrCreateById(userID);
        const operationValues = {
            type: dto.transaction.operationType,
            date: dto.transaction.operationDate,
            amount: dto.transaction.operationAmount
        };

        user.transactions.all.push(operationValues);

        switch (dto.type) {
            case 'minus': {
                user.balance -= dto.balance;
                user.transactions.expenses.push(operationValues);
                user.markModified('transactions');
                break;
            }
            case 'plus': {
                user.balance += dto.balance;
                user.transactions.incomes.push(operationValues);
                user.markModified('transactions');
                break;
            }
        }

        await user.save();
    }

    public async timelyAward(userID: string) {
        const user = await this.findOrCreateById(userID);
        const operationValue = {
            type: 'Временная награда',
            date: Date.now(),
            amount: 50
        };

        user.timelyKd = Date.now() + ms('12h');
        user.timely = true;
        user.balance += 50;

        user.transactions.all.push(operationValue);
        user.transactions.incomes.push(operationValue);

        user.markModified('transactions');

        await user.save();
    }

    public async updateTimelyNotifications(userID: string) {
        const user = await this.findOrCreateById(userID);

        user.timelyNotifications = !user.timelyNotifications;
        await user.save();
    }

    public async updateInvites(userID: string) {
        const user = await this.findOrCreateById(userID);
        const operationValue = {
            type: 'Приглашение пользователя',
            date: Date.now(),
            amount: 50
        };

        user.balance += 50;
        user.invites++;
        user.earnFromInvites += 50;

        user.transactions.all.push(operationValue);
        user.transactions.incomes.push(operationValue);

        user.markModified('transactions');

        await user.save();
    }

    public async updateOnline(userID: string, dto: OnlineUpdateDto) {
        const user = await this.findOrCreateById(userID);

        user.generalVoice += dto.time;
        user.weekVoice += dto.time;
        user.balance += Math.floor(dto.time / 60000);

        await user.save();
    }

    public async getLeaderboardByType(dto: LeaderboardDto) {
        let positions: UserDto[] = [];
        const ArrayOfIndexes: number[] = [];
        const maps: LeaderbordMap = { text: [], positions: [] };

        const allUsersInDb = await this.db.find().sort({
            [`${dto.type}`]: -1,
            user: -1
        });
        const limitUsersInDb = await this.db
            .find()
            .sort({
                [`${dto.type}`]: -1,
                user: -1
            })
            .limit(5);

        const index =
            allUsersInDb.map((user) => user.user).indexOf(dto.currentUser) + 1;

        index == 1
            ? (positions = allUsersInDb.slice(index - 1, index + 1))
            : (positions = allUsersInDb.slice(index - 2, index + 1));

        if (index - 1 == 0) {
            ArrayOfIndexes.push(index);
            ArrayOfIndexes.push(index + 1);
        } else if (index == allUsersInDb.length) {
            ArrayOfIndexes.push(index - 1);
            ArrayOfIndexes.push(index);
        } else {
            ArrayOfIndexes.push(index - 1);
            ArrayOfIndexes.push(index);
            ArrayOfIndexes.push(index + 1);
        }

        limitUsersInDb.map((user, i) => {
            i++;
            if (dto.type === 'balance') {
                maps.text.push(
                    `**${i})** <@${user.user}> — ${user.balance} ${CoinEmoji}`
                );
            } else {
                const formatedTime = this.formatTime(user, dto.type);

                maps.text.push(
                    `**${i})** <@${user.user}> — \`${formatedTime.hours} ч. ${formatedTime.minutes} м.\``
                );
            }
        });
        positions.map((user, i) => {
            if (dto.type === 'balance') {
                maps.positions.push(
                    `**${ArrayOfIndexes[i]})** <@${user.user}> — ${user.balance} ${CoinEmoji}`
                );
            } else {
                const formatedTime = this.formatTime(user, dto.type);

                maps.positions.push(
                    `**${ArrayOfIndexes[i]})** <@${user.user}> — \`${formatedTime.hours} ч. ${formatedTime.minutes} м.\``
                );
            }
            i++;
        });

        return maps;
    }

    private formatTime(user: UserDto, type: string): FortmattedTime {
        const time =
            type === 'weekVoice'
                ? user.weekVoice / 1000
                : user.generalVoice / 1000;

        return {
            hours: Math.trunc(time / 3.6e3),
            minutes: Math.trunc(time / 60) % 60
        };
    }
}
