import { Req } from '@nestjs/common';
import { RequestCreateOptionsDto, RequestAnswerDto } from '@/core/dto/Request';
import { Request } from 'express';
import * as config from '../config';

export abstract class BaseController {
    sendError(
        code: number,
        options: RequestCreateOptionsDto
    ): RequestAnswerDto {
        return { status: false, code, ...options };
    }

    sendSuccess(options: RequestCreateOptionsDto): RequestAnswerDto {
        return { status: true, code: 200, ...options };
    }

    toJSON(value: any) {
        try {
            return JSON.stringify(value);
        } catch {
            return 'Invalid JSON';
        }
    }

    toObject(value: string) {
        try {
            return JSON.parse(value);
        } catch {
            return 'Invalid JSON';
        }
    }

    checkAuth(@Req() req: Request): RequestAnswerDto {
        const auth = req.headers?.authorization;
        if (!auth || auth !== config.password) {
            return this.sendError(auth ? 403 : 401, {
                message: auth ? 'Invalid auth password' : 'Unauthorized'
            });
        }

        return null;
    }
}
