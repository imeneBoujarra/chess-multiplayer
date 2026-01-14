import { Injectable } from '@angular/core';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Injectable({ providedIn: 'root' })
export class WebsocketService {

  private client!: Client;
  private isConnected = false;
  private connectionPromise: Promise<void> | null = null;

  connect(token: string): Promise<void> {
    if (this.client && this.isConnected) {
      console.warn('WebSocket already connected');
      return Promise.resolve();
    }

    // Return existing connection promise if already connecting
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = new Promise((resolve, reject) => {
      this.client = new Client({
        webSocketFactory: () => new SockJS(`http://localhost:8080/ws?token=${token}`),
        reconnectDelay: 5000,
        debug: (str) => console.log('[STOMP]', str),
        onConnect: () => {
          this.isConnected = true;
          console.log('WebSocket connected');
          resolve();
        },
        onStompError: (frame) => {
          console.error('Broker reported error:', frame.headers['message']);
          console.error('Details:', frame.body);
          reject(new Error(frame.headers['message']));
        },
        onWebSocketClose: () => {
          this.isConnected = false;
          this.connectionPromise = null;
          console.log('WebSocket disconnected');
        },
        onWebSocketError: (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        }
      });

      this.client.activate();
    });

    return this.connectionPromise;
  }

  subscribe(destination: string, callback: (data: any) => void): StompSubscription | undefined {
    if (!this.client || !this.isConnected) {
      console.error('Cannot subscribe, WebSocket not connected');
      return undefined;
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
      this.connectionPromise = null;
    }
  }

  subscribeToGame(gameId: string, callback: (data: any) => void): StompSubscription | undefined {
    const destination = `/topic/game/${gameId}`;
    return this.subscribe(destination, callback);
  }

  isWebSocketConnected(): boolean {
    return this.isConnected;
  }
}