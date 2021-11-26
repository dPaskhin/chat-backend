import { WebSocketServer } from '@nestjs/websockets';
import { UseFilters, UsePipes } from '@nestjs/common';
import { Server } from 'socket.io';

import { ValidationPipe } from '@app/ValidationError/pipes/ValidationPipe';
import { WsErrorFilter } from '@app/ErrorFilter/filters/WsErrorFilter';

@UseFilters(WsErrorFilter)
@UsePipes(ValidationPipe)
export class BaseWsGateway {
  @WebSocketServer()
  protected readonly server!: Server;
}
