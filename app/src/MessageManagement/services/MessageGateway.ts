import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';

@WebSocketGateway()
export class MessageGateway {
  @SubscribeMessage('message/send')
  public handleMessage(@MessageBody() data: string): string {
    return `received message: "${data}"`;
  }
}
