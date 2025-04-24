import {Component} from '@angular/core';
import {MessageService} from './hello.service';

@Component({
  selector: 'app-hello',
  //imports: [],
  standalone: true,
  //templateUrl: './hello.component.html',
  styleUrl: './hello.component.scss',
  template:`
    <p>{{ message }}</p>
    <button (click)="refreshMessage()">Refresh</button>
  `
})
export class HelloComponent {

  message = '';

  constructor(private messageService: MessageService) {
    this.message = this.messageService.getMessage();
  }

  refreshMessage() {
    this.message = this.messageService.getMessage();
  }
}
