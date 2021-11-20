import { Socket } from 'socket.io';

export interface IWsHandler {
  handle(error: Error, client: Socket): void;
}
