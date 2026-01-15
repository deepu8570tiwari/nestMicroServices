import { NestFactory } from '@nestjs/core';
import { SearchModule } from './search.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title='Search';
  const logger=new Logger('SearchBootstrap');
  const rmqUrl =
    process.env.RABBITMQ_URL ?? 'amqp://catalog:catalog123@127.0.0.1:5672';

  const queue =
    process.env.SEARCH_QUEUE ?? 'search_queue';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    SearchModule,{
         transport: Transport.RMQ,
       options: {
        urls: [rmqUrl],
        queue,
        queueOptions: {
          durable: true, // production-safe
        },
      },
    }
  )
  app.enableShutdownHooks();
  await app.listen();
  logger.log(`Search RMQ Microservice listening on queue "${queue}" via ${rmqUrl}`)
}
bootstrap();
