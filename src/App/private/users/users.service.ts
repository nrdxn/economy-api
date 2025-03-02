import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDto } from './db/UserModel';
import { Model } from 'mongoose';
import { CoinEmoji } from '../../../config';
import { BalanceUpdateDto, LeaderboardDto, OnlineUpdateDto, LeaderbordMap, FortmattedTime } from './dto/RequestsDto';
import ms from 'ms';

@Injectable()
export class UsersService {
    constructor (
        @InjectModel(User.name) private db: Model<UserDto>,
    ) {}

    async findOrCreateById (userId: string) {
        let user = (await this.db.findOne({
            user: userId
        }));

        if (!user) user = await this.db.create({
            user: userId
        });

        return user;
    }

    async updateUserBalance (userId: string, dto: BalanceUpdateDto) {
        const user = await this.findOrCreateById(userId);
        const operationValues = 
        {
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
                
                await user.save();

                break;
            }
            case 'plus': {
                user.balance += dto.balance;
                user.transactions.incomes.push(operationValues);

                user.markModified('transactions');

                await user.save();

                break;
            }
        }
    }

    async timelyAward (userId: string) {
        const user = await this.findOrCreateById(userId);
        const operationValue = 
        {
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

    async updateTimelyNotifications (userId: string) {
        const user = await this.findOrCreateById(userId);

        user.timelyNotifications = !user.timelyNotifications;
        await user.save();
    }

    async updateInvites (userId: string) {
        const user = await this.findOrCreateById(userId);
        const operationValue = 
        {
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

    async updateOnline (userId: string, dto: OnlineUpdateDto) {
        const user = await this.findOrCreateById(userId);

        user.generalVoice += dto.time;
        user.weekVoice += dto.time;
        user.balance += Math.floor(dto.time / 60000);
        
        await user.save();
    }

    async getLeaderboardByType (dto: LeaderboardDto) {
        let positions: UserDto[] = [];
        const ArrayOfIndexes: number[] = [];
        const maps: LeaderbordMap = { text: [], positions: [] };

        const allUsersInDb = await this.db.find()
        .sort
            (
                {
                    [`${dto.type}`]: -1, user: -1
                }
            );
        const limitUsersInDb = await this.db.find()
        .sort
            (
                {
                    [`${dto.type}`]: -1, user: -1
                }
            )
        .limit(5);

      const index = allUsersInDb.map(user => user.user).indexOf(dto.currentUser) + 1;

      index == 1 ? positions = allUsersInDb.slice(index - 1, index + 1) : positions = allUsersInDb.slice(index - 2, index + 1);

      if (index - 1 == 0) {
          ArrayOfIndexes.push(index);
          ArrayOfIndexes.push(index + 1);
      } else if (
        index == allUsersInDb.length) {
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
            maps.text.push
            (
                `**${i})** <@${user.user}> — ${user.balance} ${CoinEmoji}`
            );
          } else {
            const formatedTime = this.formatTime(user, dto.type);

            maps.text.push
            (
                `**${i})** <@${user.user}> — \`${formatedTime.hours} ч. ${formatedTime.minutes} м.\``
            );
          }
      })
      positions.map((user, i) => {
        if (dto.type === 'balance') {
            maps.positions.push
            (
                `**${ArrayOfIndexes[i]})** <@${user.user}> — ${user.balance} ${CoinEmoji}`
            );
          } 
          else {
            const formatedTime = this.formatTime(user, dto.type);

            maps.positions.push
            (
                `**${ArrayOfIndexes[i]})** <@${user.user}> — \`${formatedTime.hours} ч. ${formatedTime.minutes} м.\``
            );
          }
          i++;
      })
      
      return maps;
    }

    private formatTime (user: UserDto, type: string): FortmattedTime {
        const time = type === 'weekVoice' ? (user.weekVoice / 1000) : (user.generalVoice / 1000);

        return {
            hours: Math.trunc(time / 3.6e3),
            minutes: Math.trunc(time / 60) % 60
        };
    }
}
