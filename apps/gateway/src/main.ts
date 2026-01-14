import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  process.title='gateway';
  const logger=new Logger('GatewayBootstrap');
  const app = await NestFactory.create(GatewayModule);
  app.enableShutdownHooks();
  await app.listen(process.env.GATEWAY_PORT ?? 3000);
  logger.log(`Gateway running at port ${process.env.GATEWAY_PORT}`);
}
bootstrap();
