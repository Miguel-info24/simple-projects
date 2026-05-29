import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

export class ChatBoxComponent {

  @Input() users: any[] = [];

  @Output() userSelected =
    new EventEmitter<any>();

  selectChat(user: any) {
    this.userSelected.emit(user);
  }
}