import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-box',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {

  users = [
    {
      name: 'Miguel',
      photo: 'https://randomuser.me/api/portraits/men/1.jpg'
    },
    {
      name: 'Ana',
      photo: 'https://randomuser.me/api/portraits/women/2.jpg'
    },
    {
      name: 'Carlos',
      photo: 'https://randomuser.me/api/portraits/men/3.jpg'
    }
  ];

}

 
