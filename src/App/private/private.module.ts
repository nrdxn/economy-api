import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DuelsModule } from './duels/duels.module';
import { RolesModule } from './roles/roles.module';

@Module({
    imports: [UsersModule, DuelsModule, RolesModule]
})
export class PrivateModule {}
