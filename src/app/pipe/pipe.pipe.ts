import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'countCharacters'
})
export class PipePipe implements PipeTransform {

  transform(value: string): number {
    return value?.length || 0;
  }
}
