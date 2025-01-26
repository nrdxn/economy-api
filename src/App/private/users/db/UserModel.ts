import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

interface UserDto {
    user: string,
    generalVoice: number,
    weekVoice: number,
    balance: number,
    invites: number,
    earnFromInvites: number,
    timelyKd: number,
    timely: boolean,
    timelyNotifications: boolean
}

@Schema()
export class User {
    @Prop()
    user: string

    @Prop({ default: 0 })
    generalVoice: number

    @Prop({ default: 0 })
    weekVoice: number

    @Prop({ default: 0 })
    balance: number

    @Prop({ default: 0 })
    invites: number

    @Prop({ default: 0 })
    earnFromInvites: number

    @Prop({ default: 0 })
    timelyKd: number

    @Prop({ default: false })
    timely: boolean

    @Prop({ default: false })
    timelyNotifications: boolean
}

export const UserSchema = SchemaFactory.createForClass<UserDto>(User)