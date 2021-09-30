import { Module } from "@nestjs/common";
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';

import { 
    ConfigModule,
    ConfigService 
} from '@nestjs/config';

import { UserModule } from 'src/modules/users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import auth from "src/config/auth";

@Module({
    imports: [
        UserModule,
        PassportModule,
        JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async () => ({
            secret: auth.secret,
        }),
        inject: [ConfigService],
        })
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy]
})
export class AuthModule {};