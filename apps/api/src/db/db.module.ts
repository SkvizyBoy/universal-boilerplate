import { Global, Module } from '@nestjs/common';
import { db } from './db.js';

@Global()
@Module({
    providers: [
        {
            provide: 'DRIZZLE_DB',
            useValue: db,
        },
    ],
    exports: ['DRIZZLE_DB'],
})
export class DbModule { }
