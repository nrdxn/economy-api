import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  get (): string {
    return 'куда мы лезем, друг';
  }
}
