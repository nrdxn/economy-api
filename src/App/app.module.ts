import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from '@/app/app.controller';
import { AppService } from '@/app/app.service';
import { PrivateModule } from '@/app/private/private.module';
import { MongoUrl } from '../config';

@Module({
    imports: [
        PrivateModule,
        MongooseModule.forRoot(MongoUrl, {
            serverSelectionTimeoutMS: 20000,
            socketTimeoutMS: 45000,
            connectTimeoutMS: 30000
        })
    ],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {}
