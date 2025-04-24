import {computed, effect, Injectable, signal} from '@angular/core';
import {interval, map, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root' // Makes it available app-wide without manual providers
})
/* Old Service
export class MessageService {
  getMessage(): string {
    return 'Hello from the service!';
  }
}
 */

export class MessageService {
  //reactive state without RxJS
  //signal holds the message reactively.
  private greeting = signal('Hello from the service!');
  private count = signal(0);

  constructor() {
    // Side effect: log every time the message updates
    effect(() => {
      console.log(`${new Date().toISOString()} [effect] New message:`, this.fullMessage());
    });
  }

  //getMessage() returns a signal, so consumers can subscribe to it.
  //getMessage = () => this.greeting;
  getMessage = () => this.fullMessage;

  // Computed message with count
  fullMessage = computed(() => {
    return `${this.greeting()} (clicked ${this.count()} times) ${new Date().toISOString()}`;
  });

  //setMessage() updates the message.
  setMessage(newMessage: string) {
    this.greeting.set(newMessage);
  }

  increment() {
    this.count.update(c => c + 1);
  }

  getMessageObservable(): Observable<string> {
    return interval(1000).pipe(
      map((count) => `Message #${count + 1}`)
    );
  }
}

/**
 signal() – holds raw state:
 Signal (by default) is mutable in terms of its value, but the reference to the signal cannot be changed directly once initialized.
 WritableSignal is explicitly mutable, meaning both the value and reference can change.
 ReadonlySignal is immutable, meaning once the signal is created, its value cannot be changed.

 WritableSignal : type

 If you declare a variable as readonly with a Signal (e.g., readonly variable = signal(type)),
 it means that the reference to the signal cannot be reassigned, but the value inside the signal can still change

 Example
 rainBowDash = signal<Model>({
 name: 'Rainbow Dash',
 age: 12
 });

 computed() – derives new state
 Les signaux computed sont mémorisés et calculés à la demande (resultat final exemple pleusieurs appel aux update de signal
 , il pred le dernier)

 effect() – runs side effects (like logging) when signals change

 **/
