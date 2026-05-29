import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContentComponent } from '../header-content/header-content.component';

@Component({
    selector: 'app-chat-content',
    standalone: true,
    imports: [
        CommonModule,
        HeaderContentComponent
    ],
    templateUrl: './chat-content.component.html',
    styleUrl: './chat-content.component.css'
})
export class ChatContentComponent {

    @Input() user: any;

    @Output()
    userSelected = new EventEmitter<any>();

    selectChat(user: any) {
        this.userSelected.emit(user);
    }
}