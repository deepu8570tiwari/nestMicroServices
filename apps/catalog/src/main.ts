import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { CatalogModule } from './catalog.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title='Catalog';
  const logger=new Logger('CatalogBootstrap');
  const port= Number(process.env.CATALOG_TCP_PORT??4011);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,{
       transport: Transport.TCP,
       options:{
        host: '0.0.0.0',
        port,
       }
    }
  )
  app.enableShutdownHooks();
  await app.listen();
  logger.log(`Catalog Microservice listening on Port ${port}`)
}
bootstrap();
