import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrivateModule } from './private/private.module';
import { MongooseModule } from '@nestjs/mongoose';
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
