import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeesNoSpecModule } from './employees--no-spec/employees--no-spec.module';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from "@nestjs/config";


@Module({
    imports: [
      ConfigModule.forRoot(),
      TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.host,
    port: +process.env.port,
    username: "postgres",
    password: process.env.pass,
    database: process.env.name,
    entities: [],
    autoLoadEntities:true,
    synchronize: true, 
  }),EmployeesNoSpecModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
