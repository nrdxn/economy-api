import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema()
export class Duels {
    @Prop()
    requester: string;

    @Prop()
    opponent: string;

    @Prop()
    message: string;

    @Prop()
    amount: number;

    @Prop({
        type: {},
        default: {
            selected: false,
            choice: null
        }
    })
    first: PlayerField;

    @Prop({
        type: {},
        default: {
            selected: false,
            choice: null
        }
    })
    second: PlayerField;
}

export const DuelsSchema = SchemaFactory.createForClass<DuelDto>(Duels);
