import { Component, inject, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../../core/ws/websocket.service';
import { Router } from '@angular/router';
import { StompSubscription } from '@stomp/stompjs';

import 'chessboard-element';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lobby-component.html',
  styleUrls: ['./lobby-component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], 
})
export class LobbyComponent implements OnInit, OnDestroy {

  private ws = inject(WebsocketService);
  private router = inject(Router);

  users: string[] = [];
  incomingInvite: string | null = null;
  inviting = false;
  
  private subscriptions: StompSubscription[] = [];

  ngOnInit(): void {
    setTimeout(() => this.setupSubscriptions(), 500);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub?.unsubscribe());
  }

  private setupSubscriptions(): void {
    const usersSub = this.ws.subscribe('/topic/lobby/users', (users: string[]) => {
      this.users = users;
    });
    if (usersSub) this.subscriptions.push(usersSub);

    const invitesSub = this.ws.subscribe('/user/queue/invites', (from: string) => {
      this.incomingInvite = from;
    });
    if (invitesSub) this.subscriptions.push(invitesSub);

    const gameStartSub = this.ws.subscribe('/user/queue/game-start', (gameId: string) => {
      this.router.navigate(['/game', gameId]);
    });
    if (gameStartSub) this.subscriptions.push(gameStartSub);
  }

  invite(username: string): void {
    this.inviting = true;
    this.ws.send('/app/lobby/invite', { to: username });
    setTimeout(() => this.inviting = false, 500);
  }

  respond(accept: boolean): void {
    this.ws.send('/app/lobby/invite/response', { from: this.incomingInvite, accept });
    this.incomingInvite = null;
  }
}
