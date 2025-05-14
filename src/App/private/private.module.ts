import { Module } from '@nestjs/common';
import { UsersModule } from '@/app/private/users/users.module';
import { DuelsModule } from '@/app/private/duels/duels.module';
import { RolesModule } from '@/app/private/roles/roles.module';

@Module({
    imports: [UsersModule, DuelsModule, RolesModule]
})
export class PrivateModule {}
