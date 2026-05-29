import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SideMenuComponent } from './components/sidemenu/side-menu.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { ChatContentComponent } from './components/chat-content/chat-content.component';
import { UserApi } from '../api/user.api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideMenuComponent, ChatBoxComponent, ChatContentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent implements OnInit {

  users: any[] = [];
  selectedUser: any = null;

  constructor(
    private userApi: UserApi,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userApi.getUsers().subscribe({
      next: (response) => {

        this.users = response.results.map((user: any) => ({
          name: `${user.name.first} ${user.name.last}`,
          photo: user.picture.medium,
          email: user.email,
          phone: user.phone,
          city: user.location.city,
          country: user.location.country
        }));

        this.cdr.detectChanges();

        console.log('TOTAL:', this.users.length);
      },

      error: (err) => {
        console.error(err);
      }
    });
  }

  selectUser(user: any) {
  this.selectedUser = user;
}
}


