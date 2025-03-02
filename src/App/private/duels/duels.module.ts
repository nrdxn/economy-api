import { Module } from '@nestjs/common';
import { DuelsService } from './duels.service';
import { DuelsController } from './duels.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Duels, DuelsSchema } from './db/DuelsModel';

@Module({
    controllers: [DuelsController],
    providers: [DuelsService],
    imports: [
        MongooseModule.forFeature([{ name: Duels.name, schema: DuelsSchema }])
    ]
})
export class DuelsModule {}
