import { ProvidersService } from './providers.service';
import { ProvidersController } from './providers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Provider } from './entities/provider.entity';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EXPIRES_IN, JWT_KEY } from 'src/auth/constants/jwt.constants';

@Module({
  imports:[TypeOrmModule.forFeature([Provider]),JwtModule.register({
    secret:JWT_KEY,
    signOptions:{
      expiresIn:EXPIRES_IN,
    }
  })],
  controllers: [ProvidersController],
  providers: [ProvidersService],
})
export class ProvidersModule {}

