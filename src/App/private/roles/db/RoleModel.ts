import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export interface ShopRolesDto {
    seller: string
    role: string
    show: boolean
    showForMe: boolean
    name: string
    price: number
    date: number
    buyCount: number
    icon: string
    members: string[]
}

@Schema()
export class Shop {
    @Prop()
    seller: string

    @Prop()
    date: number

    @Prop()
    price: number

    @Prop()
    role: string

    @Prop({ default: 0 })
    buyCount: number

    @Prop()
    icon: string

    @Prop()
    name: string

    @Prop({ default: true })
    show: boolean

    @Prop({ default: true })
    showForMe: boolean

    @Prop()
    members: string[]
}

export const ShopSchema = SchemaFactory.createForClass<ShopRolesDto>(Shop)