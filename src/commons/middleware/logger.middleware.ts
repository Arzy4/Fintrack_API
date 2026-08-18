import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use( req: Request, res: Response, next: NextFunction) {
        const startTime = Date.now();
        const { method, originalUrl } = req;
        const { statusCode } = res;

        res.on('finish', () => {
            const responseTime = Date.now() - startTime;
            console.log(`${method} -- ${originalUrl} | ${statusCode} | ${responseTime}ms`,);
        });

        next();
    }
}