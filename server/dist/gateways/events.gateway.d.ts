import { Server } from 'socket.io';
export declare class EventsGateway {
    server: Server;
    broadcast(event: string, data: any): void;
}
