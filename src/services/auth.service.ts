import { InjectRepository } from '@nestjs/typeorm';
import {Repository} from "typeorm";
import * as crypto from 'crypto';

import { Users } from '../entities';
import {Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {UserLoginDto, UserRegistrationDto} from "../dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepository: Repository<Users>,
    private readonly jwtService: JwtService
  ) {}

  public async getUserById(id) {
    return await this.userRepository.findOne(id);
  }

  public async login(user: UserLoginDto): Promise<Users | {status: number}> {
    return await this.userRepository.findOne({email: user.email}).then(userData => {
      user.password = crypto.createHmac('sha256', user.password).digest('hex');
      if (!userData) {
        return {status: 404, message: 'такой юзер не найден'}
      } else if (userData.password !== user.password) {
        return {status: 401, message: 'неправильный пороль'}
      }
      const payload = {
        userId: userData._id,
        name: userData.name,
        type: 'access'
      }
      const accessToken = this.jwtService.sign(payload, {expiresIn: process.env.EXPIRES_IN})

      return {
        accessToken,
        userId: userData._id,
        status: 200
      }
    })
  }

  public async registration(user: UserRegistrationDto): Promise<Users> {
    user.password = crypto.createHmac('sha256', user.password).digest('hex');
    return await this.userRepository.save(user);
  }
}