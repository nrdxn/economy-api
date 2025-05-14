import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
    @Prop()
    user: string;

    @Prop({
        type: {},
        default: {
            expenses: [],
            incomes: [],
            all: []
        }
    })
    transactions: TransactionsDto;

    @Prop({ default: 0 })
    generalVoice: number;

    @Prop({ default: 0 })
    weekVoice: number;

    @Prop({ default: 0 })
    balance: number;

    @Prop({ default: 0 })
    invites: number;

    @Prop({ default: 0 })
    earnFromInvites: number;

    @Prop({ default: 0 })
    timelyKd: number;

    @Prop({ default: false })
    timely: boolean;

    @Prop({ default: false })
    timelyNotifications: boolean;
}

export const UserSchema = SchemaFactory.createForClass<UserDto>(User);
