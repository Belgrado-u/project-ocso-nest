import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesNoSpecModule } from './employees--no-spec/employees--no-spec.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from "@nestjs/config";
import { ProvidersModule } from './providers/providers.module';
import { ManagersModule } from './managers/managers.module';
import { LocationsModule } from './locations/locations.module';
import { RegionsModule } from './regions/regions.module';


@Module({
    imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.host,
      port: +process.env.port,
      username: "postgres",
      password: "TheBestPassword",
      database: process.env.name,
      entities: [],
      autoLoadEntities:true,
      synchronize: true, 
  }),
  EmployeesNoSpecModule, 
  ProductsModule, ProvidersModule, ManagersModule, LocationsModule, RegionsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
