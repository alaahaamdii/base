import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import {HelloComponent} from './hello/hello.component';
import {NewHelloComponent} from './hello/newhello.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NewHelloComponent],
  //templateUrl: './app.component.html',
  template: `<new-app-hello></new-app-hello>`,
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'angular-from-scratch';
}
