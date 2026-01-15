import { NestFactory } from '@nestjs/core';
import { MediaModule } from './media.module';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  process.title='Media';
  const logger=new Logger('MediaBootstrap');
   const rmqUrl =
    process.env.RABBITMQ_URL ?? 'amqp://catalog:catalog123@127.0.0.1:5672';

  const queue =
    process.env.MEDIA_QUEUE ?? 'media_queue';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    MediaModule,{
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
  logger.log(`Media RMQ Microservice listening on queue "${queue}" via ${rmqUrl}`)
}
bootstrap();
