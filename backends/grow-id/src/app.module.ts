import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeOrmConfig from './config/typeorm.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Makes .env accessible globally
    }),

    TypeOrmModule.forRootAsync({
      useFactory: () => typeOrmConfig, // Use external config
    }),

    // Register entity-specific modules or repositories here
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
