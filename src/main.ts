import { NestFactory } from '@nestjs/core';
import { AppModule } from '@App/app.module';

export const init = async () => {
    await NestFactory.create(AppModule, { cors: true }).then((app) =>
        app.setGlobalPrefix('api').listen(4200)
    );
};

init();
