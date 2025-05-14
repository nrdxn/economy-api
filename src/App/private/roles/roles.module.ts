import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RolesService } from '@/app/private/roles/roles.service';
import { RolesController } from '@/app/private/roles/roles.controller';
import { Shop, ShopSchema } from '@/app/private/roles/db/RoleModel';
import { Byuers, ByuersSchema } from '@/app/private/roles/db/BuyModel';

@Module({
    controllers: [RolesController],
    providers: [RolesService],
    imports: [
        MongooseModule.forFeature([
            { name: Shop.name, schema: ShopSchema },
            { name: Byuers.name, schema: ByuersSchema }
        ])
    ]
})
export class RolesModule {}
