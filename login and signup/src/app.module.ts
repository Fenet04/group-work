/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import {ServeStaticModule} from '@nestjs/serve-static'
import { join } from 'path';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/roles.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/pet'),
    
    AuthModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','Frontend'),
    })
  ],
  controllers: [AppController],
  providers: [AppService
  ,{
    provide: APP_GUARD,
    useClass: RolesGuard
  }],
})
export class AppModule {}
