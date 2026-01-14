import { Injectable } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({ providedIn: 'root' })
export class WebsocketService {

  private client!: Client;
  private isConnected = false;

  connect(token: string): void {
    if (this.client && this.isConnected) {
      console.warn('WebSocket already connected');
      return;
    }

    this.client = new Client({
      webSocketFactory: () => new SockJS(`http://localhost:8080/ws?token=${token}`),
      reconnectDelay: 5000,
      debug: (str) => console.log('[STOMP]', str),
      onConnect: () => {
        this.isConnected = true;
        console.log('WebSocket connected');
      },
      onStompError: (frame) => {
        console.error('Broker reported error:', frame.headers['message']);
        console.error('Details:', frame.body);
      },
      onWebSocketClose: () => {
        this.isConnected = false;
        console.log('WebSocket disconnected');
      }
    });

    this.client.activate();
  }

  subscribe(destination: string, callback: (data: any) => void): StompSubscription | undefined {
    if (!this.client || !this.isConnected) {
      console.error('Cannot subscribe, WebSocket not connected');
      return;
    }

    return this.client.subscribe(destination, (message: IMessage) => {
      try {
        callback(JSON.parse(message.body));
      } catch (err) {
        console.error('Failed to parse WebSocket message', err);
      }
    });
  }

  send(destination: string, payload: any): void {
    if (!this.client || !this.isConnected) {
      console.error('Cannot send, WebSocket not connected');
      return;
    }

    this.client.publish({
      destination,
      body: JSON.stringify(payload),
    });
  }

  disconnect(): void {
    if (this.client && this.isConnected) {
      this.client.deactivate();
      this.isConnected = false;
    }
  }

  subscribeToGame(gameId: string, callback: (data: any) => void) {
  const destination = `/topic/game/${gameId}`;
  return this.subscribe(destination, callback);
}
}
