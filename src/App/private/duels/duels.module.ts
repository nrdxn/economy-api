import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DuelsService } from '@/app/private/duels/duels.service';
import { DuelsController } from '@/app/private/duels/duels.controller';
import { Duels, DuelsSchema } from '@/app/private/duels/db/DuelsModel';

@Module({
    controllers: [DuelsController],
    providers: [DuelsService],
    imports: [
        MongooseModule.forFeature([{ name: Duels.name, schema: DuelsSchema }])
    ]
})
export class DuelsModule {}
