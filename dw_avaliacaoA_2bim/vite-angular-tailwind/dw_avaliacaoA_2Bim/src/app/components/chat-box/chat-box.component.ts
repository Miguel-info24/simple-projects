import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {

  @Input() users: any[] = [];
  @Input() archivedCount: number = Math.floor(Math.random() * 30) + 1;;
  @Output()
  userSelected = new EventEmitter<any>();

  selectChat(user: any) {
    this.userSelected.emit(user);
  }
}