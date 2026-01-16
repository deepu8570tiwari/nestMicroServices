import { Controller, Get } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class GatewayController {
  constructor() {}

  @Get('health')
  async health(){
    const ping=async(serviceName:string, client:ClientProxy)=>{
      try {
        const result=await firstValueFrom(
          client.send('service.ping',{from:'gateway'})
        )
        return {
          ok:true,
          service:serviceName,
          result
        }
      } catch (error) {
        return {
          ok:false,
          service:serviceName,
          error:error?.message??"Unknown error",
        }
      }
    }

  }
}
