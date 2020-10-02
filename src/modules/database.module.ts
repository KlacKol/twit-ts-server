import {Global, Module} from "@nestjs/common";
import {TypeOrmModule} from '@nestjs/typeorm'

import {Posts, Users} from "../entities";

const entities = [
    Posts,
    Users
];

@Global()
@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: 'mongodb://twit:twit@mongo:27017/twit',
            logging: true,
            useUnifiedTopology: true,
            entities: [...entities]
        }),
        TypeOrmModule.forFeature([...entities]),
    ]
})

export class DatabaseModule {}