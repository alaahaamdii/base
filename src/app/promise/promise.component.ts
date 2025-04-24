import {Component} from '@angular/core';

@Component({
  selector: 'app-promise',
  standalone: true,
  template: `
    <p>{{ message }}</p>
    <button (click)="loadData()">Load Data</button>
  `
})
export class PromiseComponent {
  message: string = 'Click the button to start';

  loadData() {
    this.getData().then(result => {
      this.message = result;
    }).catch(error => {
      this.message = error;
    });
  }

  getData(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = true;
        if (success) {
          resolve('✅ Data loaded successfully!');
        } else {
          reject('❌ Failed to load data.');
        }
      }, 2000);
    });
  }
}
