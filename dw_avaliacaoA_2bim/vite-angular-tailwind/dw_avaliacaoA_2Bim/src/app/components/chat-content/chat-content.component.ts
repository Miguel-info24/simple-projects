import {Component} from '@angular/core'
import {HeaderContentComponent} from '../header-content/header-content.component'

@Component({
    selector: 'app-chat-content',
    standalone: true,
    imports: [HeaderContentComponent],
    templateUrl: './chat-content.component.html',
    styleUrl: './chat-content.component.css'
})
export class ChatContentComponent {}
