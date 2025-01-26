import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export interface BuyRoleDto {
    user: string
    role: string
    show: boolean
    date: number
    dateOfGet: number
    typeOfGet: string
}

@Schema()
export class Byuers {
    @Prop()
    user: string

    @Prop()
    date: number

    @Prop()
    role: string

    @Prop()
    dateOfGet: number

    @Prop()
    typeOfGet: string

    @Prop({ default: true })
    show: boolean
}

export const ByuersSchema = SchemaFactory.createForClass<BuyRoleDto>(Byuers)