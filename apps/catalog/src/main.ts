import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { CatalogModule } from './catalog.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title = 'Catalog';
  const logger = new Logger('CatalogBootstrap');

  const rmqUrl =
    process.env.RABBITMQ_URL ?? 'amqp://catalog:catalog123@127.0.0.1:5672';

  const queue =
    process.env.CATALOG_QUEUE ?? 'catalog_queue';

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CatalogModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [rmqUrl],
        queue,
        queueOptions: {
          durable: true, // production-safe
        },
      },
    },
  );

  app.enableShutdownHooks();
  await app.listen();

  logger.log(
    `Catalog RMQ Microservice listening on queue "${queue}" via ${rmqUrl}`,
  );
}

bootstrap();
