import {
  AfterContentInit, AfterViewInit,
  Component,
  DoCheck,
  input,
  OnChanges,
  OnDestroy,
  OnInit,
  output,
  SimpleChanges
} from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import {PipePipe} from '../pipe/pipe.pipe';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [
    UpperCasePipe,
    PipePipe
  ],
  template: `
    <p>{{ message() | uppercase }}</p>
    <p>{{ message() | countCharacters }}</p>
    <button (click)="sendMessage()">Click Me</button>
  `
})
export class ChildComponent implements OnInit,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterViewInit,
  OnDestroy {
  //@Input() message: string = '';
  readonly message = input.required<string>({alias: 'message'});
  changing :number |boolean = false; //inférence de type
  type color = 'red' | 'green' | 'blue';
  //@Output() clicked = new EventEmitter<string>();
  readonly clicked = output<string>();

  sendMessage() {
    this.clicked.emit('Hello from child!');
  }

  constructor() {
    console.log('constructor 🛠️');
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('ngOnChanges 🔁', changes);
    console.log('ngOnChanges 🔁', changes['message'].currentValue);
    console.log('ngOnChanges 🔁', changes['message'].isFirstChange());
  }

  ngOnInit() {
    console.log('ngOnInit ✅');
  }

  ngDoCheck() {
    console.log('ngDoCheck 🔍');
  }

  ngAfterContentInit() {
    console.log('ngAfterContentInit 📥');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit 👀');
  }

  ngOnDestroy() {
    console.log('ngOnDestroy 💥');
  }

}
