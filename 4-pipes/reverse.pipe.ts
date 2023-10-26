import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any): any {
    const valueArr = value.split('').reverse().join('');
    return valueArr;
  }

}
