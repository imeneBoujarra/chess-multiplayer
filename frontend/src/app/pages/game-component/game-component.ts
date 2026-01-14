import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebsocketService } from '../../core/ws/websocket.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-component.html',
  styleUrl: './game-component.scss',
})
export class GameComponent implements OnInit {

  gameId!: string;

  constructor(
    private route: ActivatedRoute,
    private wsService: WebsocketService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      console.error('No game id in route');
      return;
    }

    this.gameId = id;
  this.wsService.subscribeToGame(this.gameId!, (data) => {
  console.log('Received game update:', data);
  // Update your board here
});
  }
}
