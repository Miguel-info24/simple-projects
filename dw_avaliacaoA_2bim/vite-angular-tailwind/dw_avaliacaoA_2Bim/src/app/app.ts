import { Component } from '@angular/core';
import { SideMenuComponent } from './components/sidebar/side-menu.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideMenuComponent, ChatBoxComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {}

 
