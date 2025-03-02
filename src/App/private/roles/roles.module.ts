import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Shop, ShopSchema } from './db/RoleModel';
import { Byuers, ByuersSchema } from './db/BuyModel';

@Module(
  {
    controllers: [ RolesController ],
    providers: [ RolesService ],
    imports: [
      MongooseModule.forFeature(
        [
          { name: Shop.name, schema: ShopSchema },
          { name: Byuers.name, schema: ByuersSchema }
        ]
      )
    ]
  }
)

export class RolesModule {}
