import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { JwtModule } from '@nestjs/jwt';
import {PassportModule} from "@nestjs/passport";
import { ConfigModule } from '@nestjs/config';

import {DatabaseModule} from "./modules/database.module";
import {AuthController, PostController} from "./controllers";
import {AuthService, PostService} from "./services";
import {Posts, Users} from "./entities";

const entities = [
  Posts, Users
];

@Module({
  imports: [
      ConfigModule.forRoot(),
      DatabaseModule,
      TypeOrmModule.forFeature([...entities]),
      PassportModule.register({
        defaultStrategy: 'jwt',
      }),
      JwtModule.register({
          secret: process.env.SECRET_KEY,
          signOptions: {expiresIn: process.env.EXPIRES_IN}
      })
  ],
  controllers: [PostController, AuthController],
  providers: [PostService, AuthService],
})
export class AppModule {}
