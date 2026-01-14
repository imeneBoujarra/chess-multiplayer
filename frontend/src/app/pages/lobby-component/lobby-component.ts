import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../../core/ws/websocket.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lobby-component.html',
})
export class LobbyComponent implements OnInit {

  private ws = inject(WebsocketService);
  private router = inject(Router);

  users: string[] = [];
  incomingInvite: string | null = null;
  inviting = false;

  ngOnInit(): void {
    // Receive connected users list
    this.ws.subscribe('/topic/lobby/users', (users: string[]) => {
      this.users = users;
    });

    // Receive game invitations
    this.ws.subscribe('/user/queue/invites', (from: string) => {
      this.incomingInvite = from;
    });
  }

  invite(username: string): void {
    this.inviting = true;

    this.ws.send('/app/lobby/invite', {
      to: username
    });

    setTimeout(() => this.inviting = false, 500);
  }

  respond(accept: boolean): void {
    this.ws.send('/app/lobby/invite/response', {
      from: this.incomingInvite,
      accept
    });

    this.incomingInvite = null;
  }
}
