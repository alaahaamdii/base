import {Component, inject} from '@angular/core';
import {MessageService} from './hello.service';
import {CommonModule} from '@angular/common';
import {ChildComponent} from '../child/child.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'new-app-hello',
  imports: [CommonModule, ChildComponent],  // ✅ ngClass comes from CommonModule
  //imports: []: La propriété imports: [] n’est pas toujours nécessaire.
  // Son rôle est de donner à Angular la liste des autres composants, directives et pipes qui peuvent être utilisés à l’intérieur du template de notre composant
  standalone: true,
  providers: [
    {
      provide: MessageService,
      //le concept de useFactory est lié à la façon dont Angular configure ses dépendances via le système d'injection de dépendances.
      useFactory: () => {
        const isMorning = new Date().getHours() < 12;
        return new MessageService();
      }
    }
  ],
  styles: [`
    .red-text {
      color: red;
    }

    .bold-text {
      font-weight: bold;
    }`
  ],
  //templateUrl: './hello.component.html',
  //styleUrl: './hello.component.scss',
  template: `
    <!--If you're using the async pipe in your template,
    you don’t need to unsubscribe manually. 
    The async pipe automatically subscribes to the observable and handles unsubscription
    when the component is destroyed.
    -->
    <div *ngIf="message$ | async as message">
      <p>{{ message }}</p>
    </div>
    <p [ngStyle]="{ color: isRed ? 'red' : 'blue', fontSize: '20px' }">
      This text changes color.
    </p>
    <p [ngClass]="{ 'red-text': isRed, 'bold-text': isBold }">
      This text changes class.
    </p>
    @let test = "si";
    <p>{{ num }} {{ test }}</p>
    <button [disabled]="isButtonDisabled">Click Me</button>
    <button (click)="onButtonClick()">{{ buttonText }}</button>
    <p>{{ message() }}</p>
    <button (click)="changeMessage()">Refresh</button>
    <button (click)="increment()">Increment</button>
    <br>
    <ul>
      @for (item of items; track item) {
        <li>{{ item }}</li>
      }
      <!--<li *ngFor="let item of items">{{ item }}</li> -->
    </ul>
    <input #myInput type="text"/>
    <button (click)="logValue(myInput.value)">Log</button>
    <app-child (clicked)="handleChildClick($event)" [message]="'Hello from parent!'"></app-child>
  `
})
export class NewHelloComponent {
  message$: Observable<string>;

  // We use functional injection instead of using constructor;Avant dans le constructeur l'injection
  private messageService = inject(MessageService);
  items: string[] = ['Apple', 'Banana', 'Cherry', 'Date'];
  public num: number = 100;
  isButtonDisabled: boolean = false;
  isRed = true;
  isBold = false;
  // We access the signal from the service, returns a signal, so consumers can subscribe to it.
  // Remember message is a function you have to call it to get the value: message()
  // We can uss here readonly also
  message = this.messageService.getMessage();

  buttonText: string = 'Event binding';

  handleChildClick(message: string) {
    console.log('Received from child:', message);
  }

  onButtonClick() {
    this.buttonText = 'You Clicked Me!';
  }

  changeMessage() {
    const random = Math.floor(Math.random() * 100);
    this.messageService.setMessage('Hi there, signal updated!');
  }

  increment() {
    this.messageService.increment();
  }

  logValue(value: string) {
    console.log('Input:', value);
  }

  constructor() {
    const messageService = inject(MessageService);
    this.message$ = messageService.getMessageObservable();
  }
}
